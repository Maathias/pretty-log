const chalk = require('chalk')
const CustomDate = require('custom-date')

module.exports = {
	log: function (data, lvl = 1) {
		if (lvl > this.verbose) return

		if (this.templates[data.action]) {
			var template = this.templates[data.action]
			for(let value in this.values){
				while (template.indexOf(`\$${value}`) != -1) {
					template = template.replace(`\$${value}`, eval(this.values[value]))
				}
			}
			console.log(out = `${chalk.gray(new CustomDate().getCustomLong()) + ` ${"#".repeat(lvl)}`} ${template}`)
			return out.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '')
		}
	},
	verbose: Infinity,
	templates: {
		info: "$text"
	},
	values: {
		text: "chalk.cyan(data.data)"
	}
}

// a = function log(data, lvl) { // log user information //user, session, action, data, ip

// 	// var source = getStackTrace().toString().match(`${__dirname}/modules\\/([A-Z]\\S+)\\.js`)
// 	var source = source != null ? source[1] : 'main'

// 	var verbose = (function () {
// 		try {
// 			return db.config.verbose
// 		} catch (error) {
// 			return Infinity
// 		}
// 	})()

// 	if (lvl > verbose) return

// 	var date = chalk.gray(new CustomDate().getCustomLong()) + ` ${"#".repeat(lvl)}`,
// 		actions = {
// 			'connect': () => console.log(`${date} CONNECTED        ${chalk.gray(`${data.handle.ip} ${data.handle.shortid}`)}`),
// 			'disconnect': () => console.log(`${date} DISCONNECTED     ${chalk.gray(`${data.handle.ip} ${data.handle.shortid} ${data.handle.login}`)}`),
// 			'auth': () => console.log(`${date} AUTH ${
// 				data.handle.authStat === 0 ? 'OK         ' : (
// 					data.handle.authStat === 1 ? 'ERR        ' : (
// 						data.handle.authStat === 2 ? 'FAILED     ' : '[]'
// 					))
// 				} ${chalk.gray(`${data.handle.ip} ${data.handle.shortid} ${data.handle.login}`)}`),
// 			'command': () => console.log(`${date} ${data.com.req.com} ${
// 				data.stat === 0 ? '           ' : (
// 					data.stat === 1 ? 'ERR        ' : (
// 						data.stat === 2 ? 'FAILED     ' : '[]'
// 					))
// 				} ${chalk.gray(`${data.handle.ip} ${data.handle.shortid} ${data.handle.login}`)}`)
// 			,
// 			// 'denied':	() => console.log(`${date} ${chalk.magenta(data.udata.login + " " + data.udata.shortid + " !>! " + data.data.c + " " + data.data.arg)}`),
// 			'login': () => console.log(`${date} ${data.udata.login} ${data.udata.shortid} <-< [${data.data.arg[0]}]`),
// 			'logout': () => console.log(`${date} ${data.udata.login} ${data.udata.shortid} >-> [guest]`),
// 			// 'unknown':	() => console.log(`${date} ${chalk.yellow(`${data.udata.login} ${data.udata.shortid} ?>? ${data.data.c} ${data.data.arg}`)}`),
// 			'err': () => console.log(`${date} err -!- ${data.data}`),
// 			'info': () => console.log(`${date} ${chalk.cyan(data.data)}`),
// 			'req': () => {
// 				let status = data.handle.status
// 				switch (parseInt(status.toString()[0])) {
// 					case 1: status = chalk.cyan(status); break;
// 					case 2: status = chalk.green(status); break;
// 					case 3: status = chalk.yellow(status); break;
// 					case 4: status = chalk.magenta(status); break;
// 					case 5: status = chalk.red(status); break;
// 				}
// 				console.log(`${date} ${data.handle.method} ${status} ${data.handle.path} ${data.handle.ip}`);
// 			}

// 		},
// 		templates = {
// 			connect: "CONNECTED $1 $2",
// 			disconnect: "DISCONNECTED $1 $2 $3",
// 			auth: "AUTH $5 ",
// 			command: "$6 $5 $1 $2 $3",
// 			login: "",
// 			logout: "",
// 			err: "",
// 			info: "$0 $9",
// 			req: "$7 $8 $1"
// 		},
// 		values = [
// 			"chalk.cyan(data.data)",
// 			"chalk.gray(data.handle.ip)",
// 			"chalk.gray(data.handle.shortid)",
// 			"chalk.gray(data.handle.login)",
// 			"data.handle.authStat === 0 ? 'OK' : (data.handle.authStat === 1 ? 'ERR' : (data.handle.authStat === 2 ? 'FAILED' : '?'))",
// 			"data.stat === 0 ? '' : (data.stat === 1 ? '?' : (data.stat === 2 ? 'ERR' : '?'))",
// 			"data.com.req.com",
// 			"data.req.method",
// 			"data.req.originalUrl",
// 			"source"
// 		]

// 	if (templates[data.action]) {
// 		console.log((function (template) {
// 			for (let i = 0; i < values.length; i++) {
// 				if (template.indexOf(`\$${i}`) != -1) {
// 					template = template.replace(`\$${i}`, eval(values[i]))
// 				}
// 			}
// 			return `${date} ${template}`
// 		})(templates[data.action]))
// 	}
// }