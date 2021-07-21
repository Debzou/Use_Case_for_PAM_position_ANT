import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Section, Heading} from 'react-bulma-components';
import { ComposableMap, Geographies, Geography, Marker ,Graticule} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


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