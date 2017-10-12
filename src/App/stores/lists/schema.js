import { Schema, arrayOf } from 'normalizr'
import { arrayOfTodos } from '../todos/schema'

export const list = new Schema('lists', {
  todos: arrayOfTodos
})

export const arrayOfList = arrayOf(list)
