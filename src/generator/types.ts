import type { OpenApiSchema } from '../types/open-api'

export type JsonLike = null | boolean | number | string | JsonLike[] | { [key: string]: JsonLike }

export type ShapeNode =
    | { kind: 'primitive', type: string }
    | { kind: 'array', item: ShapeNode }
    | { kind: 'object', signature: string, properties: ShapeProperty[] }
    | { kind: 'union', types: ShapeNode[] }

export interface ShapeProperty {
    key: string
    optional: boolean
    shape: ShapeNode
}

export interface InterfaceDeclaration {
    kind: 'interface'
    name: string
    baseName: string
    rawShape: Extract<ShapeNode, { kind: 'object' }>
    properties: ShapeProperty[]
}

export interface InterfaceAliasDeclaration {
    kind: 'interface-alias'
    name: string
    target: string
}

export interface TypeReferenceAliasDeclaration {
    kind: 'type-alias'
    name: string
    target: string
}

export interface ShapeAliasDeclaration {
    kind: 'shape-alias'
    name: string
    shape: ShapeNode
}

export type Declaration =
    | InterfaceDeclaration
    | InterfaceAliasDeclaration
    | TypeReferenceAliasDeclaration
    | ShapeAliasDeclaration

export interface GeneratorContext {
    declarations: Declaration[]
    declarationByName: Map<string, Declaration>
    nameBySignature: Map<string, string>
    usedNames: Set<string>
}

export interface SemanticModel {
    path: string
    method: string
    name: string
    role: 'response' | 'responseExample' | 'input' | 'query' | 'header' | 'params'
    shape: ShapeNode
    collisionSuffix: string
}

export interface OperationTypeRefs {
    response: string
    responseExample: string
    input: string
    query: string
    header: string
    params: string
}

export interface SdkParameterManifest {
    name: string
    accessor: string
    in: 'query' | 'header' | 'path'
    required: boolean
}

export interface SdkOperationManifest {
    path: string
    method: string
    methodName: string
    summary?: string
    operationId?: string
    responseType: string
    inputType: string
    queryType: string
    headerType: string
    paramsType: string
    hasBody: boolean
    bodyRequired: boolean
    pathParams: SdkParameterManifest[]
    queryParams: SdkParameterManifest[]
    headerParams: SdkParameterManifest[]
}

export interface SdkGroupManifest {
    className: string
    propertyName: string
    operations: SdkOperationManifest[]
}

export interface SdkManifest {
    groups: SdkGroupManifest[]
}

export interface PayloadSchemaCandidate {
    schema?: OpenApiSchema
    example?: unknown
}