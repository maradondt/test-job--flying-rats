interface Routes {
  getRats: () => string,
  getRat: (nameOfRat: string) => string,
};

const routes: Routes = {
  getRats: () => 'http://localhost:7421/rat-names',
  getRat: (nameOfRat) => `http://localhost:7421/rat/${nameOfRat}`,
};

export default routes;
