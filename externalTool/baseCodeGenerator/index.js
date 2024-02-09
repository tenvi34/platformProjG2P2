import fs from 'fs'
import replace from 'replace-in-file'


function main() {
    const settings = readJsonFile('./input/settings.json')
    const prettyEventStormingData = readJsonFile('./input/prettyEventStormingData.json')

    IteratorUtil.iterateValueFromDic(prettyEventStormingData[settings.TARGET_BOUNDARY_CONTEXT].elements.Aggregate, (aggregate) => {
        const aggregateOutputPath = `./output/${aggregate.name}.java`
        const repositoryOutputPath = `./output/${aggregate.name}Repository.java`
        const manageServiceOutputPath = `./output/${aggregate.name}ManageService.java`
        
        
        fs.cpSync('./template/files/EntityTemplate.java', aggregateOutputPath, {overwrite: true})
        
        let attributeStrs = []
        aggregate.attributes.forEach((attribute) => {
            if(["id", "createdDate", "updatedDate"].includes(attribute.name)) return

            attributeStrs.push(`\tprivate ${attribute.className} ${attribute.name};\n`)
        })

        const entityOptions = {
            files: [aggregateOutputPath],
            from: [/\[\[TEMPLATE\.NAME\]\]/g, /\[\[TEMPLATE\.ATTRIBUTES\]\]/g],
            to: [aggregate.name, attributeStrs.join('\n')]
        }
        replace.sync(entityOptions)



        fs.cpSync('./template/files/RepositoryTemplate.java', repositoryOutputPath, {overwrite: true})

        const repositoryOptions = {
            files: [repositoryOutputPath],
            from: [/\[\[TEMPLATE\.NAME\]\]/g, /\[\[TEMPLATE\.RES_PATH\]\]/g],
            to: [aggregate.name, aggregate.name.toLowerCase() + "s"]
        }
        replace.sync(repositoryOptions)



        fs.cpSync('./template/files/ManageServiceTemplate.java', manageServiceOutputPath, {overwrite: true})

        const manageServiceOptions = {
            files: [manageServiceOutputPath],
            from: [/\[\[TEMPLATE\.NAME\]\]/g],
            to: [aggregate.name]
        }
        replace.sync(manageServiceOptions)
    })

    return
    copyAllRecursive('./template/base', './output/base')
    fs.renameSync('./output/base/src/main/java/SERVICE_INFO_PACKAGE_NAME',  
              `./output/base/src/main/java/${settings.SERVICE_INFO.PACKAGE_NAME}`)

    
    const options = {
        files: ['./output/base/src/main/**/*.*', './output/base/pom.xml', 
                './output/base/command/docker/value/**/*.*', './output/base/command/kubernetes/value/**/*.*'],
        from: [/\[\[SERVICE_INFO\.PACKAGE_NAME\]\]/g, /\[\[SERVICE_INFO\.SERVICE_NAME\]\]/g, 
            /\[\[SERVICE_INFO\.OPEN_PORT\]\]/g, /\[\[SERVICE_INFO\.HOST_PORT\]\]/g,
            /\[\[SERVICE_INFO\.DOCKER_IMAGE_NAME\]\]/g, /\[\[SERVICE_INFO\.DOCKER_SERVICE_NAME\]\]/g,
            /\[\[SERVICE_INFO\.DOKCER_IMAGE_UESR_NAME\]\]/g],
        to: [settings.SERVICE_INFO.PACKAGE_NAME, settings.SERVICE_INFO.SERVICE_NAME, 
            settings.SERVICE_INFO.OPEN_PORT, settings.SERVICE_INFO.HOST_PORT,
            settings.SERVICE_INFO.DOCKER_IMAGE_NAME, settings.SERVICE_INFO.DOCKER_SERVICE_NAME,
            settings.SERVICE_INFO.DOKCER_IMAGE_UESR_NAME]
    }
    replace.sync(options)
}


function readJsonFile(path) {
    return JSON.parse(fs.readFileSync(path, 'utf8'))
}

function copyAllRecursive(srcPath, destPath) {    
    if (fs.existsSync(destPath)) {
        fs.rmSync(destPath, { recursive: true })
    }
    
    fs.cpSync(srcPath, destPath, { recursive: true })
}

class IteratorUtil {
    static iterateValueFromDic(dic, callback) {
        Object.entries(dic).forEach((item, index) => {
            let element = item[1]
            callback(element)
        })
    }
}

main()