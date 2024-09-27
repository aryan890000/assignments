import {client} from "../index";
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(
	userId: number,
	title: string,
	description: string
) {
	const syntax =
		"INSERT INTO todos (user_id,title,description) VALUES($1,$2,$3) RETURNING*";
	const values = [userId, title, description];
	const res = await client.query(syntax, values);
	return res.rows[0];
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
	const syntax = "UPDATE todos SET done='true' where id=($1) RETURNING*";
	const values = [todoId];
	const res = await client.query(syntax, values);
	return res.rows[0];
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
	const syntax =
		"SELECT * FROM todos where user_id=($1)";
	const values = [userId];
	const res = await client.query(syntax, values);
	return res.rows;
}
