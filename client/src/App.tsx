import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import './App.css';
import Navbar from './components/Navbar';
import useFetch from './hooks/useFetch';
import { Autor, Knjiga, KnjigaDTO, Stavka, User, Zanr } from './model';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import KnjigaPrikaz from './pages/KnjigaPrikaz';
import KnjigePage from './pages/KnjigePage';
import KorpaPage from './pages/KorpaPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { izmeniKnjiguService, kreirajKnjiguService, obrisiKnjiguService } from './service/knjigaService';
import { naruciService } from './service/korpaService';
import { checkUser, loginUser, logoutUser, registerUser } from './service/userService';

function App() {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [knjige, setKnjige] = useFetch<Knjiga>('/knjiga')
  const [autori] = useFetch<Autor>('/autor');
  const [zanrovi] = useFetch<Zanr>('/zanr')
  const [stavke, setStavke] = useState<Stavka[]>([])


  const login = (username: string, password: string) => {
    loginUser(username, password).then(() => {
      window.location.reload();
    })
  }
  const register = (firstName: string, lastName: string, email: string, password: string) => {
    return registerUser(firstName, lastName, email, password).then(() => {
      window.location.reload()
    });
  }
  const logout = async () => {
    await logoutUser();
    return setUser(undefined);
  }
  const obrisiStavku = (id: number) => {
    setStavke(prev => {
      return prev.filter(e => e.knjiga.id !== id)
    })
  }
  const dodajUKorpu = (id: number, kolicina = 1) => {

    const knjiga = knjige.find(e => e.id === id);

    if (!knjiga) {
      return;
    }

    setStavke(prev => {
      if (prev.find(e => e.knjiga.id === id)) {
        return prev.map(element => {
          if (element.knjiga.id === id) {
            return {
              ...element, kolicina: element.kolicina + kolicina
            }
          }
          return element;
        })
      }
      return [...prev, {
        knjiga: knjiga!,
        kolicina,

      }]

    })
  }
  const izmeniStavku = (stavka: Stavka, kolicina: number) => {

    setStavke(prev => {
      return prev.map(element => {
        if (element === stavka) {
          return { ...element, kolicina }
        }
        return element;
      })
    })
  }
  const naruci = async (telefon: string, adresa: string) => {
    if (!user) {
      return;
    }
    return naruciService({
      adresa,
      telefon,
      stavke,
      poslata: false,
      user
    }).then(() => {
      setStavke([]);
    })
  }


  const obrisiKnjigu = async (id: number) => {
    if (id === 0) {
      return;
    }
    await obrisiKnjiguService(id);
    setKnjige(prev => {
      return prev.filter(e => e.id !== id);
    })
  }
  const izmeniKnjigu = async (data: KnjigaDTO, id: number) => {
    const knjiga = await izmeniKnjiguService(data, id);
    setKnjige(prev => {
      return prev.map(element => {
        if (element.id === id) {
          return knjiga;
        }
        return element;

      })
    })
  }
  const kreirajKnjigu = async (data: FormData) => {
    const knjiga = await kreirajKnjiguService(data);
    setKnjige(prev => {
      return [...prev, knjiga];
    })
  }
  useEffect(() => {
    checkUser().then(setUser).catch(() => {

    });
  }, [])

  return (
    <BrowserRouter>
      <Navbar user={user} logout={logout} />

      {
        user ? (

          <Switch>
            <Route path='/knjiga/:id'>
              <KnjigaPrikaz dodajUKorpu={dodajUKorpu} getKnjiga={id => {
                return knjige.find(elem => elem.id === id)
              }} />
            </Route>
            <Route path='/knjige'>
              <KnjigePage zanrovi={zanrovi} autori={autori} knjige={knjige} />
            </Route>
            {
              user.isAdmin && (
                <Route path='/dashboard'>
                  <Dashboard kreiraj={kreirajKnjigu} izmeni={izmeniKnjigu} obrisi={obrisiKnjigu} autori={autori} zanrovi={zanrovi} knjige={knjige} />
                </Route>
              )
            }
            <Route path='/korpa'>
              <KorpaPage naruci={naruci} izmeniStavku={izmeniStavku} obrisiStavku={obrisiStavku} stavke={stavke} />
            </Route>
            <Route path='/'>
              <HomePage knjige={knjige.slice(0, 3)} />
            </Route>
          </Switch>

        ) : (
          <Grid columns='16'>
            <Grid.Row centered className='loginRed'>
              <Grid.Column className='loginSlika' width='9'>

              </Grid.Column>
              <Grid.Column width='6'>
                <Switch>
                  <Route path='/register'>
                    <RegisterPage onSubmit={register} />
                  </Route>
                  <Route path='/'>
                    <LoginPage onSubmit={login} />
                  </Route>
                </Switch>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )
      }
    </BrowserRouter>
  );
}

export default App;
