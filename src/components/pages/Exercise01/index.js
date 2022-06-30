/**
 * Exercise 01: The Retro Movie Store
 * Implement a shopping cart with the next features for the Movie Store that is selling retro dvds:
 * 1. Add a movie to the cart
 * 2. Increment or decrement the quantity of movie copies. If quantity is equal to 0, the movie must be removed from the cart
 * 3. Calculate and show the total cost of your cart. Ex: Total: $150
 * 4. Apply discount rules. You have an array of offers with discounts depending of the combination of movie you have in your cart.
 * You have to apply all discounts in the rules array (discountRules).
 * Ex: If m: [1, 2, 3], it means the discount will be applied to the total when the cart has all that products in only.
 * 
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import './assets/styles.css'
import { useState } from 'react'

const Exercise01 = () => {
	const movies = [
		{
		id: 1,
		name: 'Star Wars',
		price: 20,
		priceFull: 0
		},
		{
		id: 2,
		name: 'Minions',
		price: 25,
		priceFull: 0
		},
		{
		id: 3,
		name: 'Fast and Furious',
		price: 10,
		priceFull: 0
		},
		{
		id: 4,
		name: 'The Lord of the Rings',
		price: 5,
		priceFull: 0
		}
	]

	const discountRules = [
		{
		m: [3, 2],
		discount: 0.25
		},
		{
		m: [2, 4, 1],
		discount: 0.5
		},
		{
		m: [4, 2],
		discount: 0.1
		} 
	]

	const [cart, setCart] = useState([])

	const addCart= (id, name, price) => {

		/* Checking if the movie is already in the cart. */
		const found = cart.find(obj => {
			if(obj.id === id) {
				return true;
			}
		})

		if(found) {
			/* Incrementing the quantity of the movie in the cart. */
			incrementQuantity(id);
		} else {
			/* Adding a new item to the cart. */
			const addItems = [...cart, { id:id, name:name, price:price, priceFull: (price*1), quantity: 1}];
			//setCart(cart => [...cart, { id:id, name:name, price:price, quantity: 1}])

			return setCart(addItems);
		}
	}

	const getTotal = () => {
		/* A ternary operator. If the cart is empty, return 0. If not, return the sum of the prices of the
		items in the cart. */
		return cart.length === 0 
			?
				0
			:
				cart.map(item => item.priceFull).reduce((prev, curr) => prev + curr, 0);
	}

	const incrementQuantity = (id) => {
		/* Updating the priceFull and quantity of the item in the cart. */
		const updatedItems =cart.map(p => 
			p.id === id ? {...p, priceFull:((p.quantity+1)*p.price), quantity: p.quantity+1 } : p
		)
		return setCart(updatedItems);
		getTotal();
	}

	const decrementQuantity = (id, quantity) => {

		if(quantity === 1) {
			//setCart(cart.slice(cart.indexOf(id, 1)))
			removeItem(id);
		} else {
			/* Updating the priceFull and quantity of the item in the cart. */
			const updatedItems = cart.map(p => 
				//p.id === id ? setCart(cart => [...cart, {...p, quantity: p.quantity+1 }]) : p
				p.id === id ? {...p, priceFull:((p.quantity-1)*p.price), quantity: p.quantity-1 } : p
	
			)
			return setCart(updatedItems);
		}

		
		
		getTotal();
	}

	const removeItem = (id) => {
		/* Filtering the cart array and returning the items that do not match the id. */
		const removeItems = cart.filter((item, index) => item.id !== id);
		return setCart(removeItems);
		
	}

	const getDiscount = () => {
		const onlyDiscount = discountRules.map(discount => (
				[discount.m]
			));
		console.log(onlyDiscount);

		  const onlyIdCart = cart.map(car => (
			[car.id]
			));
		  console.log(onlyIdCart);
	}

	return (
		<section className="exercise01">
			<div className="movies__list">
				<ul>
				{movies.map(o => (
					<li className="movies__list-card" key={o.id}>
					<ul>
						<li>
						ID: {o.id}
						</li>
						<li>
						Name: {o.name}
						</li>
						<li>
						Price: ${o.price}
						</li>
					</ul>
					<button onClick={() => addCart(o.id, o.name, o.price)}>
						Add to cart
					</button>
					</li>
				))}
				</ul>
			</div>

			<div className="movies__cart">
				<ul>
				{cart.map(x => (
					<li className="movies__cart-card" key={x.id}>
					<ul>
						<li>
						ID: {x.id}
						</li>
						<li>
						Name: {x.name}
						</li>
						<li>
						Unit Price: ${x.price}
						</li>
						{
						x.priceFull !== x.price
						?<li>
						Full Price: ${x.priceFull}
						</li>
						:
						''
						}
					</ul>
					<div className="movies__cart-card-quantity">
						<button onClick={() => decrementQuantity(x.id, x.quantity)}>
						-
						</button>
						<span>
						{x.quantity}
						</span>
						<button onClick={() => incrementQuantity(x.id)}>
						+
						</button>
					</div>
					</li>
				))}
				</ul>
				<div className="movies__cart-total">
				<p>Total: ${getTotal()}</p>

				{
					(getDiscount())
				}

				</div>
			</div>
		</section>
	)
} 

export default Exercise01