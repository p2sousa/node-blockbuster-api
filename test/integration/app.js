describe('Routes Movies', () => {
  const defaultMovie = {
    id: 1,
    name: "Default Movie"
  }

  describe('Route GET /movies', () => {
    it('should return a list of movies', done => {
  
      request
        .get('/movies')
        .end((err, res) => {
          
          expect(res.body[0].id).to.be.eql(defaultMovie.id)
          expect(res.body[0].name).to.be.eql(defaultMovie.name)
          
          done(err)
        })
    })
  })
})