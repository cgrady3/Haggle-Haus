var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var passportJWT = require('passport-jwt');
var JWTStrategy = passportJWT.Strategy;
var bcrypt = require('bcrypt');

var { secret } = require('./keys');

var UserModel = require('./models/user');

passport.use(new LocalStrategy({
  usernameField: username,
  passwordField: password,
}, async (username, password, done) => {
  try {
    var userDocument = await UserModel.findOne({username: username}).exec();
    var passwordsMatch = await bcrypt.compare(password, userDocument.passwordHash);

    if (passwordsMatch) {
      return done(null, userDocument);
    } else {
      return done('Incorrect Username / Password');
    }
  } catch (error) {
    done(error);
  }
}));

passport.use(new JWTStrategy({
    jwtFromRequest: req => req.cookies.jwt,
    secretOrKey: secret,
  },
  (jwtPayload, done) => {
    if (Date.now() > jwtPayload.expires) {
      return done('jwt expired');
    }

    return done(null, jwtPayload);
  }
));

var router = express.Router();

router.post('/register', async (req, res) => {
  var { username, password } = req.body;

  // authentication will take approximately 13 seconds
  // https://pthree.org/wp-content/uploads/2016/06/bcrypt.png
  var hashCost = 10;

  try {
    var passwordHash = await bcrypt.hash(password, hashCost);
    var userDocument = new UserModel({ username, passwordHash });
    await userDocument.save();
    
    res.status(200).send({ username });
    
  } catch (error) {
    res.status(400).send({
      error: 'req body should take the form { username, password }',
    });
  }
});

router.post('/login', (req, res) => {
  passport.authenticate(
    'local',
    { session: false },
    (error, user) => {

      if (error || !user) {
        res.status(400).json({ error });
      }

      /** This is what ends up in our JWT */
      var payload = {
        username: user.username,
        expires: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS),
      };

      /** assigns payload to req.user */
      req.login(payload, {session: false}, (error) => {
        if (error) {
          res.status(400).send({ error });
        }

        /** generate a signed json web token and return it in the response */
        var token = jwt.sign(JSON.stringify(payload), keys.secret);

        /** assign our jwt to the cookie */
        res.cookie('jwt', jwt, { httpOnly: true, secure: true });
        res.status(200).send({ username });
      });
    },
  )(req, res);
});

module.exports = router;

router.get('/protected',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    var { user } = req;

    res.status(200).send({ user });
  });