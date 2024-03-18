import en from './dictionaries/en'
import it from './dictionaries/it'

export const config = {
  defaultLocale: 'en',
  locales: ['en', 'it'],
} as const

export type I18nConfig = typeof config
export type Locale = I18nConfig['locales'][number]
export type Dictionary = typeof en

type ExcludeLiteral<T, U> = T extends U ? never : T
export type DictionaryScope = ExcludeLiteral<keyof Dictionary, 'common'>

export type WebsiteDictionary = Dictionary['website']
export type BlogDictionary = Dictionary['blog']
export type CommonDictionary = Dictionary['common']

type MergeTypes<T, U> = {
  [K in keyof T | keyof U]: K extends keyof U ? U[K] : K extends keyof T ? T[K] : never
}

export type DictionaryModule<T extends DictionaryScope> = MergeTypes<
  CommonDictionary,
  T extends 'website' ? WebsiteDictionary : BlogDictionary
>

const pickModule = <T extends DictionaryScope>(scope: T, dictionary: Dictionary) => {
  return scope === 'website'
    ? ({ ...dictionary.common, ...dictionary.website } as DictionaryModule<T>)
    : ({ ...dictionary.common, ...dictionary.blog } as DictionaryModule<T>)
}

const dictionaries = {
  en: <T extends DictionaryScope>(scope: T) => pickModule(scope, en),
  it: <T extends DictionaryScope>(scope: T) => pickModule(scope, it),
}

export const getDictionary = async <T extends DictionaryScope>(locale: Locale = 'en', scope: T) => {
  return dictionaries[locale](scope)
}
