const chalk = require('chalk')
const CustomDate = require('custom-date')

module.exports = {
        log: function(data, lvl = 1) {
                if (lvl > this.verbose) return
                if (typeof data != 'object') data = { data: data, action: 'info' }

                if (this.templates[data.action]) {
                    // insert data into template
                    var template = this.templates[data.action]
                    for (let value in this.values) {
                        let search = `\$${value}`
                        while (template.indexOf(search) != -1) {
                            template = template.replace(search, eval(this.values[value]))
                        }
                    }
                    // assemble string and log it
                    let out = `${chalk.gray(new CustomDate().getCustomLong()) + ` ${"#".repeat(lvl)}`} ${template}`
			console.log(out)

			// return escaped string
			var clear = out.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '')
			if (this.after) this.after(clear)
			return clear
		} else {
			console.warn(`An attempt to log was made, but specified action is undefined`)
		}
	},
	verbose: Infinity,
	templates: {
		info: "$normal",
		highlight: "$highlight",
		warning: "$warning",
		error: "$error"
	},
	values: {
		normal: "data.data",
		highlight: "chalk.cyan(data.data)",
		warning: "chalk.yellow(data.data)",
		error: "chalk.red(data.data)"
	}
}