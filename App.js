import React, { useEffect, useState } from 'react';
import { Text,FlatList, View, StyleSheet,TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DataTable } from 'react-native-paper';
import { Container, Header, Content, List, ListItem,Thumbnail, Left ,Body,Right , Icon} from 'native-base';
import AssetExample from './components/AssetExample';
import { Card,Avatar, Button,  Title, Paragraph  } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Tab = createBottomTabNavigator();

function Main({route, navigation }) {
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(json => {
        setUsers(json);
      });
  });
  const [users, setUsers] = useState([]);
  const [getItemsList,setItemsList] = useState([]);
  const [getcounter, setCounter] = useState(0);
  return (
    <Container>
      <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          
          renderItem={({ item }) => (
            <Content>
          <List>
            <ListItem  onPress={() => {
            navigation.navigate('Details', {
            list:item})
            setCounter(0);
            }
          } selected>
              <Left>
                <Text>{item.name}</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            
          </List>
        </Content>
        //     <View >
        //       <View >
        //       <Content>
        //   <List>
          //   <ListItem onPress={() => {
          //   navigation.navigate('Details', {
          //   list:item})
          //   setCounter(0);
          //   }
          // }>
        //       <Text>{item.name}</Text>
        //     </ListItem>
        //   </List>
        // </Content>
        //       </View>
        //     </View>
          )}
        />
      </Container>
  );
}
function UserDetails({ route }) {
  console.log(route.params.data.name);
  const data=route.params.data;
  return (
    <Card>
    <Card.Title title="User Details"  />
    <Card.Content>
      <Title>Name </Title>
      <Paragraph> {data.name}</Paragraph>
      <Title>UserName </Title>
      <Paragraph> {data.username}</Paragraph>
      <Title>Email </Title>
      <Paragraph> {data.email}</Paragraph>
      <Title>Company Address </Title>
      <Paragraph>Street: {data.address.street}</Paragraph>
      <Paragraph>City {data.address.street}</Paragraph>
      <Title>Company Name </Title>
      <Paragraph> {data.company.name}</Paragraph>
    </Card.Content>
  </Card>

  );
}

function Todos({ route }) {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${route.params.data.id}/todos`)
      .then(res => res.json())
      .then(json => {
        setUsers(json);
      });
  });
  
  return (
    <Container>
      <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          
          renderItem={({ item }) => (
            <View >
              <View >
              <Content>
          <List>
            <ListItem 
          >
              <Text>{item.title}</Text>
            </ListItem>
          </List>
        </Content>
              </View>
            </View>
          )}
        />
      </Container>
  );
}

function AlbumScreen({ route,navigation }) {
  console.log(route.params.data.name)
  const [albums, setAlbum] = useState([]);
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${route.params.data.id}/albums`)
      .then(res => res.json())
      .then(json => {
        setAlbum(json);
      });
  });
  
  return (
    <Container>
      <FlatList
          data={albums}
          keyExtractor={(item) => item.id}
          
          renderItem={({ item }) => (
            <View >
              <View >
              <Content>
          <List>
            <ListItem onPress={() => {
            navigation.navigate('Album', {
            list:item})
            }
          }>
              <Text>{item.title}</Text>
            </ListItem>
          </List>
        </Content>
              </View>
            </View>
          )}
        />
      </Container>
  );
}

function Post({ route }) {
  const [post, setPost] = useState([]);
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${route.params.data.id}/posts`)
      .then(res => res.json())
      .then(json => {
        setPost(json);
      });
  });
  console.log(route.params.data.name);
  const data=route.params.data;
  return (
    <Container>
      <FlatList
          data={post}
          keyExtractor={(item) => item.id}
          
          renderItem={({ item }) => (
            <View >
              <View >
              <Content>
          <List>
            <ListItem 
          >
              <Text>{item.title}</Text>
            </ListItem>
          </List>
        </Content>
              </View>
            </View>
          )}
        />
      </Container>

  );
}


function Details ({route, navigation }) {
  
 var data = route.params.list;
 const [getList,setList] = useState(data); 

  return (
<Tab.Navigator
      initialRouteName="UserDetails"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
      
      
    >
      <Tab.Screen
        name="UserDetails"
        component={UserDetails}
        initialParams={{data: data}}
        options={{
          tabBarLabel: 'User Details',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AlbumScreen"
        component={AlbumScreen}
        initialParams={{data: data}}
        options={{
          tabBarLabel: 'Albums',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
          // tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Todos"
        component={Todos}
        initialParams={{data: data}}
        options={{
          tabBarLabel: 'To dos List',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="post"
        component={Post}
        initialParams={{data: data}}
        options={{
          tabBarLabel: 'Posts',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


// This is Album Screen
function Album ({route, navigation }) {
  const [photos, setPhotos] = useState([]);
  navigation.setOptions({
      headerRight: () => (
      <Text onPress={() => {
            navigation.navigate('Home')
            
            }
          } style={{color:'Black',marginRight:10,fontSize:15}}>Main</Text>
      ),
    });
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/albums/1/photos')
      .then(res => res.json())
      .then(json => {
        setPhotos(json);
      });
  });
 
  return (
    <Container>
    <FlatList
          data={photos}
          keyExtractor={(item) => item.id}
          
          renderItem={({ item }) => (
            <Content>
          <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: item.url }} />
              </Left>
              <Body>
                <Text style={{marginLeft:'50px'}} note numberOfLines={1}>{item.title}</Text>
              </Body>
              <Right>
              </Right>
            </ListItem>
          </List>
        </Content>
          )}
        />
      </Container>
  );
}



const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen
          name="Home"
          component={Main}
          options={({ navigation, route }) => ({
             title:'User Details App',
             headerStyle:{
               height:75,

             }
          })}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={({ navigation, route }) => ({
           title:'User Details ',
           headerLeft:null
          })}
        />
        <Stack.Screen
          name="Album"
          component={Album}
          options={({ navigation, route }) => ({
           title:'Album ',
           headerLeft:null
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
