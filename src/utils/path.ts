import glob from 'glob'
import path from 'path'

export const globPromise = (dir: string, asObject = false) => {
  const regexp = /^(.*[\\\/])(.*)$/
  return new Promise((resolve, reject) => {
    glob(
      path.resolve(`${dir}/**/*`),
      { strict: false, silent: true, nodir: true },
      (err: Error, files: string[]) => {
        if (err) {
          reject(err)
        } else {
          if (asObject) {
            const filesObject = files.map((file) => {
              const match = regexp.exec(file)
              return {
                fullpath: file,
                filepath: match[1],
                filename: match[2],
                dirname: regexp.exec(
                  match[1].substring(0, match[1].length - 1),
                )[2],
              }
            })
            resolve(filesObject)
          } else {
            resolve(files)
          }
        }
      },
    )
  })
}
