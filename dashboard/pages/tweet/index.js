import { TagCloud } from 'react-tagcloud';
import {Section,Container} from 'react-bulma-components';
import { useState, useEffect } from 'react';
import axios from 'axios';

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

const Tweet = () => {
    // hook
    const [tweetWord, setTweetWord] = useState([]);
    const [listHastage, setListHastage] = useState([]);
    const [granularity,setGranularity] = useState('months');

    // init 
    // get tweet
    useEffect(async() => {
        
        try{
            const response = (await axios.get(`/api/hastage/${granularity}`)).data;
            setTweetWord(response.result);
            let hastageValided = []
            response.result.forEach(element=>{
            const json = JSON.parse(element)
            
            json.hastageList.forEach(sub_element=>{
                if (sub_element in hastageValided){
                    console.log(sub_element)
                    hastageValided[sub_element] += 1;
                }else{
                    hastageValided[sub_element]=0;
                }
            })
            
        });
        setListHastage(hastageValided);
        console.log(hastageValided)
        }catch{
            console.log('erro get : /api/hastage/${granularity}')
        }

    }, []);

    return(
        <>
        <Section>
            <Container>
            </Container>
        </Section>
        </>
    )
}

export default Tweet;