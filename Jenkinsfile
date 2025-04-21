pipeline {
  agent any

  environment {
    // Evita que React trate los warnings como errores
    CI = "false"
    // Token para despliegue automátizado (si se usa); de lo contrario, puede omitirse
    VERCEL_TOKEN = credentials('vercel-token')
  }

  stages {

    stage('Declarative: Checkout SCM') {
      steps {
        // Obtiene el código fuente según el SCM (en este caso, Git)
        checkout scm
      }
    }

    stage('Tool Install') {
      steps {
        // Usa la herramienta Node.js configurada en "Global Tool Configuration" (nombre: 'Node 20')
        tool name: 'Node 20', type: 'nodejs'
      }
    }

    stage('Clean workspace') {
      steps {
        // Limpia el workspace borrando archivos de ejecuciones anteriores
        deleteDir()
      }
    }

    stage('Checkout') {
      steps {
        // Clona el repositorio desde GitHub (actualiza la URL y branch según corresponda)
        git url: 'https://github.com/guswill24/node-project.git', branch: 'main'
      }
    }

    stage('Install dependencies') {
      steps {
        // Instala las dependencias con npm.
        // En Windows usamos "bat" para ejecutar comandos por consola
        bat 'npm install --legacy-peer-deps'
      }
    }

    stage('Run tests') {
      steps {
        // Ejecuta las pruebas unitarias. La opción "--watchAll=false" permite finalizar el proceso
        bat 'npm test -- --watchAll=false'
      }
    }

    stage('Build app') {
      steps {
        // Realiza el build final del proyecto (e.g.: "npm run build" para un proyecto React)
        bat 'npm run build'
      }
    }
  }

  post {
    success {
      echo "✅ Pipeline ejecutado correctamente. Build exitoso."
    }
    failure {
      echo "❌ Error en alguna etapa del pipeline. Revisar los logs."
    }
    always {
      echo "📦 Pipeline finalizado (éxito o fallo). Puedes revisar el historial."
    }
  }
}
