#!groovy
@Library(['jobs-libraries@master','deploy-libraries@master']) _

runPipelineWithParams (
    [
        PPM: 'INI000', // Marcela 
        PROJECT_CODE: 'SEB',
        PROJECT_TYPE: 'openshift/frontend/angular',
        TEST_DEPLOY_DEVOPS: false,
        NODE_VERSION_UNITTEST: 'Node10',
        
        // openshift variables
        OCP_PROJECT_NAME: '', //cambiar por namespace asociado al proyecto
        OCP_APP_NAME: '', //cambiar por namespace asociado al proyecto
        OCP_APP_SUB_NAME: '',
        OCP_CLUSTER_NAME: '',

        // Parámetros para la publicación de reportes UNIT TEST en Jira® Software
        ID_PROJECT: 'J00065',
        ID_TEST_PLAN: 'J00160-1123',
        ID_TEST: 'XRUQ-29059',
        CORREOS: 'david.maldonado@servexternos.santander.cl',

        // Parametros para Testing funcional
        TESTREPO_URL: '',
        TESTREPO_BRANCH:'',
        FUNCTIONAL_TEST: 'false',
        AMBIENTE:'',
        RUNNER: '',
        CUCUMBER_TAGS: '',
        URL_OWASPZAP : ''

        SECURITY_TOOL: 'FORTIFYSSC',

    ]
)
