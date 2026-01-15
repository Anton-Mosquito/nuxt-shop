import 'dotenv/config'
import { PrismaClient } from './generated/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const connectionString = `${process.env.DATABASE_URL}`
const pool = new pg.Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Start seeding...')

  await prisma.review.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  const categoryPath = path.join(__dirname, 'category.json')
  const categoriesData = JSON.parse(fs.readFileSync(categoryPath, 'utf-8'))

  console.log(`Seeding ${categoriesData.length} categories...`)
  
  for (const cat of categoriesData) {
    await prisma.category.create({
      data: {
        slug: cat.slug,
        name: cat.name
      }
    })
  }

  const files = fs.readdirSync(__dirname)
  const productFileName = files.find(f => f.includes('produ') && f.endsWith('.json'))
  if (!productFileName) throw new Error('Cannot find products.json file')
  
  const productsPath = path.join(__dirname, productFileName)
  const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf-8'))

  console.log(`Seeding ${productsData.length} products...`)

  for (const prod of productsData) {
    // Determine category slug connection
    const categorySlug = prod.category

    await prisma.product.create({
      data: {
        title: prod.title,
        description: prod.description,
        price: prod.price,
        discountPercentage: prod.discountPercentage,
        rating: prod.rating,
        stock: prod.stock,
        tags: prod.tags,
        brand: prod.brand,
        sku: prod.sku,
        weight: prod.weight,
        dimensions: prod.dimensions, // Json
        warrantyInformation: prod.warrantyInformation,
        shippingInformation: prod.shippingInformation,
        availabilityStatus: prod.availabilityStatus,
        returnPolicy: prod.returnPolicy,
        minimumOrderQuantity: prod.minimumOrderQuantity,
        meta: prod.meta, // Json
        images: prod.images, // Json
        thumbnail: prod.thumbnail,
        category: {
          connect: {
            slug: categorySlug
          }
        },
        reviews: {
          create: prod.reviews.map((rev: any) => ({
            rating: rev.rating,
            comment: rev.comment,
            reviewerName: rev.reviewerName,
            reviewerEmail: rev.reviewerEmail,
            createdAt: new Date(rev.date)
          }))
        }
      }
    })
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })