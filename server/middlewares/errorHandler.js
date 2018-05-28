module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log('ERROR HANDLER');
    console.log(err.message);
    console.log(err.stack);
  }
}