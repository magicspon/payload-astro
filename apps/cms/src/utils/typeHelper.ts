// Check if a type contains any object (excluding null)
type HasObject<T> = T extends object ? (T extends null ? false : true) : false

// Remove number from union if it contains both number and object types
type RemoveStringIfHasObject<T> = string extends T
	? true extends HasObject<T>
		? Exclude<T, string>
		: T
	: T

// Recursive helper that handles arrays / readonly arrays and objects
export type DangerouslyExpandRelations<T> =
	// readonly arrays / tuples (simplified): handle element type first
	T extends readonly (infer U)[]
		? DangerouslyExpandRelations<RemoveStringIfHasObject<U>>[]
		: // normal arrays (redundant but explicit)
			T extends (infer U)[]
			? DangerouslyExpandRelations<RemoveStringIfHasObject<U>>[]
			: // objects: map properties and recurse (also handles optional/nullable)
				T extends object
				? {
						[K in keyof T]: DangerouslyExpandRelations<
							RemoveStringIfHasObject<T[K]>
						>
					}
				: // primitives / others
					T
