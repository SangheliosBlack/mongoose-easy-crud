# Mongoose Easy CRUD Setup Script

echo "# Mongoose Easy CRUD

Este paquete proporciona una utilidad para generar fácilmente rutas y controladores CRUD (Create, Read, Update, Delete) para modelos de Mongoose en Node.js. Además, genera automáticamente archivos de rutas y controladores basados en el nombre del modelo proporcionado como argumento.

## Instalación

\`\`\`bash
npm install -g mongoose-easy-crud
\`\`\`

## Uso

\`\`\`bash
# Después de instalar el paquete, utiliza el script generate-routes para generar automáticamente rutas y controladores para un modelo específico.
# Asegúrate de tener la estructura de carpetas adecuada y sigue los siguientes pasos:

generate-routes NOMBRE_DEL_MODELO
\`\`\`

Reemplaza \`NOMBRE_DEL_MODELO\` con el nombre de tu modelo de Mongoose.

## Ejemplo

\`\`\`bash
# Supongamos que tienes un modelo llamado "Usuario". Puedes generar las rutas y controladores con el siguiente comando:

generate-routes Usuario
\`\`\`

Esto creará archivos de rutas y controladores en las carpetas correspondientes.

## Contribuir

\`\`\`bash
# Si encuentras errores o tienes sugerencias de mejora, no dudes en abrir un problema o enviar una solicitud de extracción.
\`\`\`

## Licencia

\`\`\`bash
# Este proyecto está bajo la Licencia ISC. Ver el archivo LICENSE para más detalles.
\`\`\`"