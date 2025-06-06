import passport from 'passport';

export const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

export const githubAuth = passport.authenticate('github', {
  scope: [ 'user:email' ] 
});
 