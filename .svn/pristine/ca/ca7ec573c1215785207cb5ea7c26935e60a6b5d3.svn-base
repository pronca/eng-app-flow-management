import org.jenkinsci.plugins.pipeline.modeldefinition.Utils

properties(
    [
    	buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '', numToKeepStr: '1')),
		disableConcurrentBuilds(),
		
        parameters([
        	[
                $class: 'ChoiceParameter',
                choiceType: 'PT_SINGLE_SELECT',
                name: 'BUILD_MODE',
                script: [
                    $class: 'GroovyScript', 
                    script: [
                        classpath: [], 
                        sandbox: true, 
                        script: "return['BUILD', 'BRANCH', 'RELEASE']"
                    ]
                ]
            ],
            
        	[
                $class: 'CascadeChoiceParameter',
                choiceType: 'PT_CHECKBOX',
                name: 'RELEASE_PARAMS',
                referencedParameters: 'BUILD_MODE', 
                script: [
                    $class: 'GroovyScript', 
                    script: [
                        classpath: [], 
                        sandbox: true, 
                        script: '''
                            if (BUILD_MODE.equals('BRANCH')) {
                                return ['PR']
                            } else if (BUILD_MODE.equals('RELEASE')) {
                                return ['RC', 'DIRECT', 'CE']
                            } else {
                             	return []
                            }
                        '''
                    ]
                ]
            ],
            
            [
	            $class: 'DynamicReferenceParameter',
	            choiceType: 'ET_FORMATTED_HTML',
	            name: 'BRANCH_CUSTOM_NAME',
	            referencedParameters: 'BUILD_MODE',
	            script: [
	                $class: 'GroovyScript',
	                script: [ 
	                    classpath: [], 
	                    sandbox: true, 
	                    script: """
	                    	if (BUILD_MODE.equals('BRANCH')) {
	                    		return "<input name='value' value='' class='setting-input' type='text'>"
	                    	} else {
	                    		return "No param required"
	                    	}
	                    """
	                ]
	            ]
	        ],
	        
	        [
	            $class: 'DynamicReferenceParameter',
	            choiceType: 'ET_FORMATTED_HTML',
	            name: 'BRANCH_REL_PATH',
	            referencedParameters: 'BUILD_MODE',
	            script: [
	                $class: 'GroovyScript',
	                script: [ 
	                    classpath: [], 
	                    sandbox: true, 
	                    script: """
	                    	if (BUILD_MODE.equals('BRANCH')) {
	                    		return "<input name='value' value='' class='setting-input' type='text'>"
	                    	} else {
	                    		return "No param required"
	                    	}
	                    """
	                ]
	            ]
	        ],
        	
       		booleanParam(
				name: 'EXCLUDE_TEST', 
				defaultValue: false,
				description: 'Exclude test and SonarQube'),
				
			credentials(
					name: 'credentials',
					credentialType: 'com.cloudbees.plugins.credentials.common.StandardUsernamePasswordCredentials', 
					defaultValue: '',  
					required: false)	
        ])   
    ]
)  

node {
	try {
		def BASE_PATH = 'https://svnsanita.eng.it/svn/areas'
		def PROJECT = "eng-app-flow-management"

		stage('Setup') {
		
		    copyArtifacts(projectName: 'E-ARCH-PLATFE-eng-app-starter', filter: '*.tar.gz')
			
            sh """
            	tar -xzf eng-app-cli.tar.gz
            	tar -xzf starter.tar.gz
				rm -rf eng-app-cli.tar.gz
				rm -rf starter.tar.gz
			"""
		}
				
		stage('Checkout') {
			
			withCredentials([
				usernamePassword(
					credentialsId: '2053954e-7f20-460b-9a12-7206d42a87bd', 
					passwordVariable: 'PASSWORD_VAR', 
					usernameVariable: 'USERNAME_VAR')
				]) {
				
				nodejs('NodeJS') {
				    
	    			sh """
	    			    cd starter
				        alias engcli=\'node --max-old-space-size=8192 ../eng-app-cli/bin/start.js\'
				        
				        export npm_config_engcli_svn_username=${USERNAME_VAR}
				        export npm_config_engcli_svn_password=${PASSWORD_VAR}
				        export npm_config_engcli_svn_url=${BASE_PATH}
				        
	    			    engcli resolve-dependency ${BASE_PATH}/RS000/modules/care-client/${PROJECT}/${BRANCH_NAME} -n -lpm
	    			"""
				}
			}
		}
		
		stage('Branch') {
		
			if(params.BUILD_MODE.equals('BRANCH')) {
			
				withCredentials([
					usernamePassword(
						credentialsId: 'credentials', 
						passwordVariable: 'PASSWORD_VAR', 
						usernameVariable: 'USERNAME_VAR')
					]) {
			
				    	nodejs('NodeJS') {

							String[] Env_Array = "${params.RELEASE_PARAMS}".split(',');
							
							def parameter = '-s';
							
							if(Env_Array.contains('PR')) {
								parameter += ' -pr' 
							}
							
							def custom_name = "$params.BRANCH_CUSTOM_NAME"
							if (custom_name?.trim()) {
								parameter += ' branchName=' + custom_name.substring(0, custom_name.length()-1)
							}
							
							def rel_path = "$params.BRANCH_REL_PATH"
							if (rel_path?.trim()) {
								parameter += ' branchRelPath=' + rel_path.substring(0, rel_path.length()-1)
							}
							
						    sh """
						    	cd starter 
						    	alias engcli=\'node --max-old-space-size=8192 ../eng-app-cli/bin/start.js\'
						    	
								export npm_config_engcli_svn_username=${USERNAME_VAR}
						        export npm_config_engcli_svn_password="${PASSWORD_VAR}"
						        export npm_config_engcli_svn_url=${BASE_PATH}
						    	
						    	engcli lp ${PROJECT} source
	        					engcli lm ${PROJECT} source
	        					
						    	engcli bram ${PROJECT} $parameter
						    """
						}
						    
					}
			} else {
		        echo "Skip Branch"
		        Utils.markStageSkippedForConditional('Branch')
		    }           
		}
		
		stage('Test') {
		    
		    if (!params.BUILD_MODE.equals('BRANCH') && !params.EXCLUDE_TEST) {
		    
    		    nodejs('NodeJS') {
    		    
    		    
	        			sh """
	        			    cd starter
	        			    alias engcli=\'node --max-old-space-size=8192 ../eng-app-cli/bin/start.js\'
	        			    
	        			    engcli ulp eng-app*
	        			    
	        			    engcli lp eng-app* source -t
	        			    engcli lm eng-app* source -t
	        			    
	        			    npm run ng test ${PROJECT} -- --watch=false --browsers=ChromeHeadlessNoSandbox --code-coverage
	        			"""
    			}
    			
		    } else {
		        echo "Skip test"
		        Utils.markStageSkippedForConditional('Test')
		    }
		}
		
		stage('SonarQube') {
		    def branchName = '' + BRANCH_NAME;
		    
		    if (!params.BUILD_MODE.equals('BRANCH') && !params.EXCLUDE_TEST && branchName.endsWith('trunk')) {
		    
		    	def javaHome = tool name: 'JDK_SONAR', type: 'jdk'
				withEnv(["JAVA_HOME=$javaHome"]) {	
		    	
	    			withSonarQubeEnv(credentialsId: '4d440962-12bf-459e-ab35-336f1e9cdcc2') {
	    		        
	    		        def scannerHome = tool name: 'sonar-scanner-latest', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
	    		        
	    		        nodejs('NODEJS_SONAR') {
	                        sh """
	                            ${scannerHome}/bin/sonar-scanner \\
	                            -Dsonar.projectKey=${PROJECT} \\
	                            -Dsonar.projectName='118 ${PROJECT}' \\
	                            -Dsonar.projectVersion=LATEST-SNAPSHOT \\
	                            -Dsonar.projectBaseDir=${WORKSPACE}/starter \\
	                            -Dsonar.sources=${WORKSPACE}/starter/projects/${PROJECT} \\
	                            -Dsonar.scm.disabled=true \\
	                            -Dsonar.javascript.lcov.reportPaths=${WORKSPACE}/starter/coverage/lcov.info \\
	                            -Dsonar.exclusions=**/*spec.ts,**/environments/** \\
	                            -Dsonar.coverage.exclusions=**/*spec.ts,**/environments/** \\
	                            -Dsonar.cpd.exclusions=**/*spec.ts,**/environments/**
	                        """
	    		        }
	                }
                }
    			
		    } else {
		        echo "Skip SonarQube"
		        Utils.markStageSkippedForConditional('SonarQube')
		    }
		}
		
		stage('Build') {
		
			if (!params.BUILD_MODE.equals('BRANCH')) {
		    
			    nodejs('NodeJS') {
					
				    sh """
				    	cd starter 
				    	alias engcli=\'node --max-old-space-size=8192 ../eng-app-cli/bin/start.js\'
				    	
				    	engcli ulp eng-app*
		        			    
		        		engcli lp eng-app* dist
		        		engcli lm eng-app* dist
		        		
		        		engcli lp ${PROJECT} source
		        		engcli lm ${PROJECT} source
				    	
				    	engcli b ${PROJECT} depsCheck=LENIENT
				    """
			    }
			    
		    } else {
		        echo "Skip Build"
		        Utils.markStageSkippedForConditional('Build')
		    }		    
		}
		
		stage('Release') {
		
			if(params.BUILD_MODE.equals('RELEASE')) {
			
				withCredentials([
					usernamePassword(
						credentialsId: 'credentials', 
						passwordVariable: 'PASSWORD_VAR', 
						usernameVariable: 'USERNAME_VAR')
					]) {
			
				    	nodejs('NodeJS') {
							
							String[] Env_Array = "${params.RELEASE_PARAMS}".split(',');
							
							def parameter = '-s -sw';
							
							if(Env_Array.contains('RC')) {
								parameter += ' -rc' 
							}
							
							if(Env_Array.contains('DIRECT')) {
								parameter += ' -D' 
							}
							
							if(Env_Array.contains('CE')) {
								parameter += ' -ce' 
							}
												
							sh """
							    	cd starter 
							    	alias engcli=\'node --max-old-space-size=8192 ../eng-app-cli/bin/start.js\'
							    	
							    	export npm_config_engcli_svn_username=${USERNAME_VAR}
						       	 	export npm_config_engcli_svn_password="${PASSWORD_VAR}"
						        	export npm_config_engcli_svn_url=${BASE_PATH}
							    	
							    	engcli relm ${PROJECT} $parameter
			
							    	engcli ulm ${PROJECT}
									engcli ulp ${PROJECT}
									engcli lp ${PROJECT} source
									engcli lm ${PROJECT} source
							    	
							    	engcli b ${PROJECT} depsCheck=LENIENT
							    	engcli pub ${PROJECT} ASK-RESPOND-OK=true
							"""
					    }
					    
					    def uploadFile = './' + "${PROJECT}" + '/package.json';
	    				httpRequest contentType: 'APPLICATION_OCTETSTREAM', httpMode: 'POST', responseHandle: 'NONE', uploadFile: "${uploadFile}", url: 'https://sipweb.eng.it/PSGSip/rest/sip/deliverable/json', wrapAsMultipart: false
					}
				} else {
			        echo "Skip Release"
			        Utils.markStageSkippedForConditional('Release')
			    }           
		}
		
		
	} finally {
		cleanWs notFailBuild: true;
	}
}