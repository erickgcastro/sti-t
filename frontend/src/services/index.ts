export enum HttpMethods {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
  PATCH = "patch",
}

export class Service {
  public static defaultPath: string
  public static key: string

  public static endpoint(defaultPath: string, path: string) {
    return `${defaultPath}${path}`
  }

  public static toFormData(data: Record<string, any>) {
    const formData = new FormData()

    for (const key in data) {
      if (data[key] instanceof FileList) {
        for (let i = 0; i < data[key].length; i++) {
          formData.append(key, data[key][i])
        }
        continue
      }

      if (key === "utm") {
        formData.append(key, JSON.stringify(data[key]))
        continue
      }

      formData.append(key, data[key])
    }

    return formData
  }
}

export function Key<T extends typeof Service>(constructor: T, method: keyof T) {
  const prefix = constructor.key || constructor.name

  return `${prefix}:${method.toString()}`
}

export function Resolve<A extends keyof T, T extends Service>(
  constructor: T,
  method: keyof T
): {
  key: string
  service: T[A]
} {
  const prefix: string = (constructor as any).key || (constructor as any).name

  const x = constructor[method]

  return {
    key: `${prefix}:${method.toString()}`,
    service: x as T[A],
  }
}
