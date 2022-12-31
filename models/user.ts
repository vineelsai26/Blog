import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const SALT_WORK_FACTOR = 10

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		default: ""
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		default: ""
	},
	profilePicture: {
		type: String,
		default: "https://picsum.photos/id/1/200/300"
	},
	role: {
		type: String,
		required: true,
		default: "user"
	},
})

UserSchema.pre('save', function (next) {
	var user = this
	if (!user.isModified('password')) return next()

	bcrypt.genSalt(SALT_WORK_FACTOR, function (err: mongoose.CallbackError | undefined, salt: any) {
		if (err) return next(err)
		bcrypt.hash(user.password, salt, function (err: mongoose.CallbackError | undefined, hash: string) {
			if (err) return next(err)
			user.password = hash
			next()
		})
	})
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)

export default User
