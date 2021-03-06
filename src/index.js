// NON-RETURNING
function Handle_forEach(t, path, aggressive_optimization, possible_undefined) {
	var arrayName = path.scope.generateUidIdentifier("a"),
		funcName = path.scope.generateUidIdentifier("f"),
		iterator = path.scope.generateUidIdentifier("i"),
		call = t.expressionStatement (
			possible_undefined
			? t.logicalExpression (
				"&&",
				t.binaryExpression (
					"!==",
					t.memberExpression (
						arrayName,
						iterator,
						true
					),
					t.identifier("undefined")
				),
				t.callExpression(funcName, [
					t.memberExpression (
						arrayName,
						iterator,
						true
					),
					iterator,
					arrayName
				])
			)
			: t.callExpression(funcName, [
				t.memberExpression (
					arrayName,
					iterator,
					true
				),
				iterator,
				arrayName
			])
		)

	path.getStatementParent().insertBefore ([
		t.variableDeclaration("let", [
			t.variableDeclarator (
				arrayName,
				path.node.callee.object
			)
		]),

		t.variableDeclaration("let", [
			t.variableDeclarator (
				funcName,
				path.node.arguments[0]
			)
		]),

		aggressive_optimization
			? t.forStatement (
				t.variableDeclaration("let", [
					t.variableDeclarator (
						iterator,
						t.memberExpression (
							arrayName,
							t.identifier("length")
						)
					)
				]),
				t.updateExpression("--", iterator),
				null,
				call
			)
			: t.forStatement (
				t.variableDeclaration("let", [
					t.variableDeclarator (
						iterator,
						t.numericLiteral(0)
					)
				]),
				t.binaryExpression (
					"<",
					iterator,
					t.memberExpression (
						arrayName,
						t.identifier("length")
					)
				),
				t.updateExpression("++", iterator),
				call
			)
	])

	path.remove()
}

function Handle_every(t, path, aggressive_optimization, possible_undefined) {
	var arrayName = path.scope.generateUidIdentifier("a"),
		funcName = path.scope.generateUidIdentifier("f"),
		iterator = path.scope.generateUidIdentifier("i"),
		expr = t.ifStatement (
			possible_undefined
			? t.logicalExpression (
				"&&",
				t.binaryExpression (
					"!==",
					t.memberExpression (
						arrayName,
						iterator,
						true
					),
					t.identifier("undefined")
				),
				t.unaryExpression (
					"!",
					t.callExpression(funcName, [
						t.memberExpression (
							arrayName,
							iterator,
							true
						),
						iterator,
						arrayName
					])
				)
			)
			: t.unaryExpression (
				"!",
				t.callExpression(funcName, [
					t.memberExpression (
						arrayName,
						iterator,
						true
					),
					iterator,
					arrayName
				])
			),
			t.breakStatement()
		)
		
	path.getStatementParent().insertBefore ([
		t.variableDeclaration("let", [
			t.variableDeclarator (
				arrayName,
				path.node.callee.object
			)
		]),

		t.variableDeclaration("let", [
			t.variableDeclarator (
				funcName,
				path.node.arguments[0]
			)
		]),

		aggressive_optimization
			? t.forStatement (
				t.variableDeclaration("let", [
					t.variableDeclarator (
						iterator,
						t.memberExpression (
							arrayName,
							t.identifier("length")
						)
					)
				]),
				t.updateExpression("--", iterator),
				null,
				expr
			)
			: t.forStatement (
				t.variableDeclaration("let", [
					t.variableDeclarator (
						iterator,
						t.numericLiteral(0)
					)
				]),
				t.binaryExpression (
					"<",
					iterator,
					t.memberExpression (
						arrayName,
						t.identifier("length")
					)
				),
				t.updateExpression("++", iterator),
				expr
			)
	])

	path.remove()
}

// RETURNING
function Handle_map(t, path, aggressive_optimization, possible_undefined) {
	var arrayName = path.scope.generateUidIdentifier("a"),
		funcName = path.scope.generateUidIdentifier("f"),
		resArrName = path.scope.generateUidIdentifier("r"),
		iterator = path.scope.generateUidIdentifier("i"),
		expr = t.expressionStatement(t.callExpression (
			t.memberExpression (
				resArrName,
				t.identifier("push")
			),
			[t.callExpression(funcName, [
				t.memberExpression(
					arrayName,
					iterator,
					true
				),
				iterator,
				arrayName
			])]
		)),
		for_body = possible_undefined
			? t.ifStatement (
				t.binaryExpression (
					"!==",
					t.memberExpression (
						arrayName,
						iterator,
						true
					),
					t.identifier("undefined")
				),
				expr
			)
			: expr

	path.getStatementParent().insertBefore([
		t.variableDeclaration("let", [
			t.variableDeclarator (
				arrayName,
				path.node.callee.object
			)
		]),

		t.variableDeclaration("let", [
			t.variableDeclarator (
				funcName,
				path.node.arguments[0]
			)
		]),

		t.variableDeclaration ("let", [
			t.variableDeclarator (
				resArrName,
				t.arrayExpression()
			)
		]),

		aggressive_optimization
			? t.forStatement (
				t.variableDeclaration("let", [
					t.variableDeclarator (
						iterator,
						t.memberExpression (
							arrayName,
							t.identifier("length")
						)
					)
				]),
				t.updateExpression("--", iterator),
				null,
				for_body
			)
			: t.forStatement (
				t.variableDeclaration("let", [
					t.variableDeclarator (
						iterator,
						t.numericLiteral(0)
					)
				]),
				t.binaryExpression (
					"<",
					iterator,
					t.memberExpression (
						arrayName,
						t.identifier("length")
					)
				),
				t.updateExpression("++", iterator),
				for_body
			)
	])

	path.replaceWith(resArrName)
}

function Handle_filter(t, path, aggressive_optimization, possible_undefined) {
	var arrayName = path.scope.generateUidIdentifier("a"),
		funcName = path.scope.generateUidIdentifier("f"),
		resArrName = path.scope.generateUidIdentifier("r"),
		iterator = path.scope.generateUidIdentifier("i"),
		expr = t.callExpression (
			funcName,
			[
				t.memberExpression (
					arrayName,
					iterator,
					true
				),
				iterator,
				arrayName
			]
		),
		for_body = t.ifStatement (
			possible_undefined
				? t.logicalExpression (
					"&&",
					t.binaryExpression (
						"!==",
						t.memberExpression (
							arrayName,
							iterator,
							true
						),
						t.identifier("undefined")
					),
					expr
				)
				: expr,
			t.expressionStatement(t.callExpression (
				t.memberExpression (
					resArrName,
					t.identifier("push")
				),
				[t.memberExpression (
					arrayName,
					iterator,
					true
				)]
			))
		)

	path.getStatementParent().insertBefore([
		t.variableDeclaration("let", [
			t.variableDeclarator (
				arrayName,
				path.node.callee.object
			)
		]),

		t.variableDeclaration("let", [
			t.variableDeclarator (
				funcName,
				path.node.arguments[0]
			)
		]),

		t.variableDeclaration ("let", [
			t.variableDeclarator (
				resArrName,
				t.arrayExpression()
			)
		]),

		aggressive_optimization
			? t.forStatement (
				t.variableDeclaration("let", [
					t.variableDeclarator (
						iterator,
						t.memberExpression (
							arrayName,
							t.identifier("length")
						)
					)
				]),
				t.updateExpression("--", iterator),
				null,
				for_body
			)
			: t.forStatement (
				t.variableDeclaration("let", [
					t.variableDeclarator (
						iterator,
						t.numericLiteral(0)
					)
				]),
				t.binaryExpression (
					"<",
					iterator,
					t.memberExpression (
						arrayName,
						t.identifier("length")
					)
				),
				t.updateExpression("++", iterator),
				for_body
			)
	])

	path.replaceWith(resArrName)
}

export default babel => {
	const { types: t } = babel

	return {
		visitor: {
			IfStatement(path) {
				if (!t.isBlockStatement(path.node.consequent))
					path.node.consequent = t.blockStatement([ path.node.consequent ]);
			},

			ForStatement(path) {
				if (!t.isBlockStatement(path.node.body))
					path.node.body = t.blockStatement([ path.node.body ]);
			},

			WhileStatement(path) {
				if (!t.isBlockStatement(path.node.body))
					path.node.body = t.blockStatement([ path.node.body ]);
			},

			ArrowFunctionExpression(path) {
				if (!t.isBlockStatement(path.node.body))
					path.node.body = t.blockStatement([ t.returnStatement(path.node.body) ]);
			},

			CallExpression(path) {
				// Don't modify if in ternary
				if (path.findParent(path => path.isConditionalExpression()))
					return

				var aggressive_optimization = true,
					possible_undefined = false
				{
					let comments
					if ((comments = path.getStatementParent().node.leadingComments) && comments[comments.length - 1]) {
						let comment = comments[comments.length - 1].value
						if (/^\s*loop-optimizer:(\s+)KEEP/.test(comment))
							return
						aggressive_optimization = !/^\s*loop-optimizer:(.*),?FORWARD/.test(comment)
						possible_undefined = /^\s*loop-optimizer:(.*),?POSSIBLE_UNDEFINED/.test(comment)
					}
				}

				if (path.node.callee.property && path.node.arguments.length === 1)
					switch (path.node.callee.property.name) {
						// NON-RETURNING
						case "forEach":
							Handle_forEach(t, path, aggressive_optimization, possible_undefined)
							break
						case "every":
							Handle_every(t, path, aggressive_optimization, possible_undefined)
							break

						// RETURNING
						case "map":
							Handle_map(t, path, aggressive_optimization, possible_undefined)
							break
						case "filter":
							Handle_filter(t, path, aggressive_optimization, possible_undefined)
							break
					}
			}
		}
	};
}
