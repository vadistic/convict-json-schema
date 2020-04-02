import fs from 'fs'
import path from 'path'

export type FileResult = {
  errors?: string[]
  file: any
}

export const importFile = async (filepath: string): Promise<FileResult> => {
  const abs = path.join(process.cwd(), filepath)
  const extname = path.extname(filepath)

  if (extname === 'js' || extname === 'ts') {
    return handleBabel(abs)
  }

  if (extname === 'js' || extname === 'ts') {
    return handleJson(abs)
  }

  return { errors: [`Unsupported file extension ${extname}`], file: undefined }
}

const handleBabel = async (filepath: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('@babel/register')({ extensions: ['.js', '.jsx', '.ts', '.tsx'] })

  const errors: string[] = []
  let res: any

  try {
    res = await import(filepath)
    console.log(res)
  } catch (err) {
    errors.push(err.message)
  }

  return {
    errors,
    file: res,
  }
}

const handleJson = async (filepath: string) => {
  return {
    errors: undefined,
    file: undefined,
  }
}
