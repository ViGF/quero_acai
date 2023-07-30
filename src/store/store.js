import { create } from 'zustand'

const useCart = create(
  (set, get) => ({
    cart: [],
    product: {},
    setProduct: (params) => {
      const { newProduct } = params
      
      set((state) => {
        return {
          ...state,
          product: newProduct
        }
      })
    },
    addItemToCart: (params) => {
      const { newItem } = params

      set((state) => {
        const newCart = [...state.cart, newItem]
        return {
          ...state,
          cart: newCart
        }
      })
    },
    remooveItemFromCart: (params) => {
      const { itemIndex } = params

      set((state) => {
        const newCart = state.cart.filter((element, index) => {
          return index !== itemIndex
        })
        return {
          ...state,
          cart: newCart
        }
      })
    },
    emptyCart: () => {
      set((state) => {
        const newCart = []

        return {
          ...state,
          cart: newCart
        }
      })
    }
  })
)

export default useCart