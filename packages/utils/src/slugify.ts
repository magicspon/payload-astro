import lib from 'slugify'

type Args = Parameters<typeof lib>[1]

export function slugify(
	str: string,
	opts: Args = { strict: true, lower: true, trim: true },
) {
	return lib(str, opts)
}
