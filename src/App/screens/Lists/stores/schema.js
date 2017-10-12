import { Schema, arrayOf } from 'normalizr'
import { arrayOfTodos } from 'App/screens/Todos/stores/schema'

export const list = new Schema('lists', {
  todos: arrayOfTodos
})

export const arrayOfList = arrayOf(list)
