import { sign, verify } from '../helpers/JWTHelper.js';

export default async function auth(req, res, next) {
	try{
		if (req.cookies.session === undefined) {
			if(!req.is('application/json')) return res.redirect('/login');
			return res.status(401).json({ status: 'unauthorized', message: 'Authentication expired, please login again!' });
		}
		return verify(req.cookies.session)
			.then(userInfo => {
                req.user = userInfo;
				return next();
			})
			.catch((e) => {
				console.log(e);
				res.redirect('/login');
			});
	} catch(e) {
		console.log(e);
		return res.status(500).send('Internal server error');
	}
}