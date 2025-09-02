'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo } from 'react'
import SpriteLayer from './SpritesLayer'

type Wish = {
  id: string
  name: string
  message: string
  image_url?: string | null
}


