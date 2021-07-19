import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TagCloud } from 'react-tagcloud';
import { Container, Section, Heading} from 'react-bulma-components';
import { ComposableMap, Geographies, Geography, Marker ,Graticule} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const data = [
  { value: 'jQuery', count: 25 },
  { value: 'MongoDB', count: 18 },
  { value: 'JavaScript', count: 38 },
  { value: 'React', count: 30 },
  { value: 'Nodejs', count: 28 },
  { value: 'Express.js', count: 25 },
  { value: 'HTML5', count: 33 },
  { value: 'CSS3', count: 20 },
  { value: 'Webpack', count: 22 },
  { value: 'Babel.js', count: 7 },
  { value: 'ECMAScript', count: 25 },
  { value: 'Jest', count: 15 },
  { value: 'Mocha', count: 17 },
  { value: 'React Native', count: 27 },
  { value: 'Angular.js', count: 30 },
  { value: 'TypeScript', count: 15 },
  { value: 'Flow', count: 30 },
  { value: 'NPM', count: 11 },
]

const markers = [
  {
    markerOffset: -15,
    name: "Buenos Aires",
    coordinates: [-58.3816, -34.6037]
  },
  { markerOffset: -15, name: "La Paz", coordinates: [-68.1193, -16.4897] },
  { markerOffset: 25, name: "Brasilia", coordinates: [-47.8825, -15.7942] },
  { markerOffset: 25, name: "Santiago", coordinates: [-70.6693, -33.4489] },
  { markerOffset: 25, name: "Bogota", coordinates: [-74.0721, 4.711] },
  { markerOffset: 25, name: "Quito", coordinates: [-78.4678, -0.1807] },
  { markerOffset: -15, name: "Georgetown", coordinates: [-58.1551, 6.8013] },
  { markerOffset: -15, name: "Asuncion", coordinates: [-57.5759, -25.2637] },
  { markerOffset: 25, name: "Paramaribo", coordinates: [-55.2038, 5.852] },
  { markerOffset: 25, name: "Montevideo", coordinates: [-56.1645, -34.9011] },
  { markerOffset: -15, name: "Caracas", coordinates: [-66.9036, 10.4806] },
  { markerOffset: -15, name: "Lima", coordinates: [-77.0428, -12.0464] }
];

const CustomWordCloud = (tag, size, color) => (
  <span
    key={tag.value}
    style={{
      fontSize: `${size / 2}em`,
      border: `3px solid ${color}`,
      margin: '3px',
      padding: '3px',
      display: 'inline-block',
      color: '#260068',
    }}
  >
    {tag.value}
  </span>
)


const Home = () => {
  // hook
  const [tweet, setTweet] = useState([]);
  
  // init 
  // get tweet
  useEffect(async() => {
    const response = (await axios.get(`/api/location`)).data;
    setTweet(response.result);
    tweet.forEach((e)=>{
      console.log(eval(JSON.parse(e).location));
    })
  }, []);

  // render HTML
  return (
    <>
      <Section>
        <Container>
            <center><Heading>Tweet world map</Heading>
            <ComposableMap style={{height:"80vh"}}>
              <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
              <Geographies geography={geoUrl} fill="#260068" stroke="#cad3e8">
                {({ geographies }) =>
                  geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)
                }
              </Geographies>
              {tweet.map(element => (
                
                <Marker 
                coordinates={eval(JSON.parse(element).location)} 
                >
                  <circle r={3} fill="red" stroke="red" strokeWidth={2} />
                </Marker>
              ))}
              </ComposableMap></center>
        
        </Container>
      </Section>
    </>
    )
}
export default Home;