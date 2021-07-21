import { TagCloud } from 'react-tagcloud';
import {Section,Container,Columns,Card,Media,Heading,Content,Image} from 'react-bulma-components';
import { useState, useEffect } from 'react';
import axios from 'axios';


const customTagWord = (tag, size, color) => (
    <span
      key={tag.value}
      style={{
        fontSize: `${size / 2}em`,
        border: `5px solid ${color}`,
        margin: '3px',
        padding: '3px',
        display: 'inline-block',
      }}
    >
      {tag.value}
    </span>
  )

const Tweet = () => {
    // hook
    const [listHastage, setListHastage] = useState([]);
    const [granularity,setGranularity] = useState('months');
    const [bestTweet, setbestTweet] = useState({});
    // init 
    // get tweet
    useEffect(async() => {
        // get data
        // map reduce
      
        const response = (await axios.get(`/api/hastage/${granularity}`)).data;
    
        // using for reducing
        let hastageValided = [];
        // using for computing the best tweet
        let bestTweetTMP = {retweet_count:0};
        // mapping data
        response.result.forEach(element=>{

            const json = JSON.parse(element);
            // reducing
            json.hastageList.forEach(sub_element=>{
                if (sub_element in hastageValided){
                    // reducing
                    hastageValided[sub_element]+=1;
                }else{
                    hastageValided[sub_element]=1;
                }
            });
            // best tweet
            if(bestTweetTMP.retweet_count<json.retweet_count){
                bestTweetTMP = json;
            }
            console.log(json.retweet_count);
        });

        const dataFormated = []
        // Formating data
        for (const property in hastageValided) {
            dataFormated.push({value:property,count:hastageValided[property]})
        }
        setListHastage(dataFormated);
        setbestTweet(bestTweetTMP);
        console.log(bestTweetTMP);
    }, []);

    return(
        <>
        <Section>
            <Container>
            <Columns>
                <Columns.Column size={8}>
                    <TagCloud
                    minSize={5}
                    maxSize={15}
                    tags={listHastage.sort().slice(0, 20)}
                    renderer={customTagWord}
                    />
                </Columns.Column>
                <Columns.Column>
                    <Card style={{ width: 300, margin: 'auto' }}>
                        <Card.Content>
                            <Media>
                            <Media.Item renderAs="figure" align="left">
                                <Image
                                size={64}
                                alt="64x64"
                                src="/twitter.png"
                                />
                            </Media.Item>
                            <Media.Item>
                                <Heading size={4}>Best tweet retweet</Heading>
                                <Heading subtitle size={6}>
                                @{bestTweet.name}
                                </Heading>
                            </Media.Item>
                            </Media>
                            <Content>
                            {bestTweet.text}
                            <br />
                            <br />
                            <Columns>
                                    <Columns.Column >
                                        <Media>
                                            <Media.Item renderAs="figure" align="left">
                                                <Image
                                                size={32}
                                                alt="32x32"
                                                src="/retweet.png"
                                                />
                                            </Media.Item>
                                            <Media.Item>
                                                {bestTweet.retweet_count}
                                            </Media.Item>
                                        </Media>      
                                    </Columns.Column>
                                    <Columns.Column >
                                        <Media>
                                            <Media.Item renderAs="figure" align="left">
                                                <Image
                                                size={32}
                                                alt="32x32"
                                                src="/like.png"
                                                />
                                            </Media.Item>
                                            <Media.Item>
                                                {bestTweet.favorite_count}
                                            </Media.Item>
                                        </Media>      
                                    </Columns.Column>
                            </Columns>
                            </Content>
                        </Card.Content>
                    </Card>
                </Columns.Column>
            </Columns>
            
            </Container>
        </Section>
        </>
    )
}

export default Tweet;