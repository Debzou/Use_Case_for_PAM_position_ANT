import { useState, useEffect } from 'react';
import axios from 'axios';
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