import { Block } from 'payload'
import { buttonsBlock } from './buttonBlock/button.config'
import { formBlock } from './formBlock/formBlock.config'
import { group } from './group/group.config'
import { hero } from './hero/hero.config'
import { imageBlock } from './imageBlock/imageBlock.config'
import { relatedBlocks } from './related/related.config'
import { textBlock } from './textBlock/textBlock.config'

export const blocks: Block[] = [
	hero,
	textBlock,
	formBlock,
	relatedBlocks,
	group,
	imageBlock,
	buttonsBlock,
]
