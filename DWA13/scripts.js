const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State']
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie']

names.forEach((name) => console.log(name))

names.forEach((name, index) => console.log(`${name} (${provinces[index]})`))

const upperProvinces = provinces.map((province) => province.toUpperCase())
console.log(upperProvinces)

const numCharNames = names.map((name) => name.length)
console.log(numCharNames)

const sortedProvinces = provinces.toSorted()
console.log(sortedProvinces)

const filteredProvinces = provinces.filter((province) => province.includes('Cape'))
console.log(filteredProvinces, filteredProvinces.length)

const containsS = names.map((name) => {
    const nameAsArray = name.split('')
    return nameAsArray.some((letter) => letter.toLowerCase() === 's')
})
console.log(containsS)

const nameProvinceAsObj = names.reduce((acc, current, index) => {
    return {
        ...acc,
        [current]: provinces[index]
    }
}, {Ashwin: 'Western Cape'})
console.log(nameProvinceAsObj)

const products = [
    { product: 'banana', price: "2" },
    { product: 'mango', price: 6 },
    { product: 'potato', price: ' ' },
    { product: 'avocado', price: "8" },
    { product: 'coffee', price: 10 },
    { product: 'tea', price: '' },
  ]

products.forEach((item) => console.log(item.product))

console.log(
    products.filter((item) => item.product.length <= 5),

    products.map((item) => {
        return {
            product: item.product, price: parseInt(item.price)
        }
    }).filter((item) => !isNaN(item.price)).reduce((acc, current) => acc + current.price, 0),

    products.reduce((acc, current, index) => {
        if(!index) {
            return `${acc}${current.product}`
        }
        if(index === 5) {
            return `${acc} and ${current.product}` 
        }
        return `${acc}, ${current.product}`
    }, ''),

    products.reduce((acc, current) => {
        const priceAsInt = !isNaN(parseInt(current.price)) ? parseInt(current.price) : 2
        if(priceAsInt > acc[0].price) {
            acc.unshift({product: current.product, price: priceAsInt})
        }
        return acc
    }, [{product: 'banana', price: 2}]).reduce((acc, current, index, array) => {
        return `Highest: ${array[0].product}. Lowest: ${array[array.length - 1].product}`
    }),

    products.reduce((acc, current) => {
        acc.push({name: Object.entries(current)[0][1], cost: Object.entries(current)[1][1]})

        return acc
    }, [])
)