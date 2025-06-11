import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { FIRESTORE_DB } from '../../../../firebaseconfig.js';

import { StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function SelectBeer ( { setPosting_beer } ) {
    const [beers, setBeers] = useState([{}])
    
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    async function getBeers () {
        setLoading(true)
        
        await getDocs(collection(FIRESTORE_DB, "beers"))
        .then((snapshot) => {
            let beersArray = []
            snapshot.forEach((doc) => {
                beersArray.push(doc.data())
            })
            setBeers(beersArray)
        })
        .catch((err) => { setError(err) })
        .finally(() => { setLoading(false) })
    }

    useEffect(() => {
        getBeers()
    }, [])

  return (
    <View className="flex-row mt-6 mb-3">
      <SelectDropdown
        data={beers}
        // defaultValueByIndex={8} // use default value by index or default value
        // defaultValue={{title: 'kiss', icon: 'emoticon-kiss-outline'}} // use default value by index or default value
        onSelect={(selectedItem, index) => {
          setPosting_beer(selectedItem)
        }}
        renderButton={(selectedItem, isOpen) => {
          return (
            <View className="flex-row bg-gray-700 rounded-xl py-2 w-full">
              {/* <Icon name={selectedItem ? selectedItem.icon : 'emoticon'} style={styles.dropdown1ButtonIconStyle} /> */}
              <Text style={styles.dropdown1ButtonTxtStyle}>
                { selectedItem ? (selectedItem.name) : 'Select a beer to review'}
              </Text>
              <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} style={styles.dropdown1ButtonArrowStyle} />
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            loading ? <View><Text>Loading Beers...</Text></View> :
                <View
                style={{
                    ...styles.dropdown1ItemStyle,
                    ...(isSelected && {backgroundColor: 'grey'}),
                }}>
                    <Text style={styles.dropdown1ItemTxtStyle}>{item.name}</Text>
                    <Text style={styles.dropdown1ItemTxtStyle}>{item.category}</Text>
                </View> 
          );
        }}
        dropdownStyle={styles.dropdown1MenuStyle}
        showsVerticalScrollIndicator={false}
        search
        searchInputStyle={styles.dropdown1SearchInputStyle}
        searchInputTxtColor={'#FFFFFF'}
        searchPlaceHolder={'  Search beers'}
        searchPlaceHolderColor={'#F8F8F8'}
        renderSearchInputLeftIcon={() => {
          return <FontAwesome name={'search'} color={'#F8F8F8'} size={18} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 116,
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 90,
    backgroundColor: '#E9ECEF',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 16,
  },
  headerTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#151E26',
  },
  dropdownButtonStyle: {
    width: 350,
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
    textAlign: 'center',
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownSearchInputStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#B1BDC8',
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#B1BDC8',
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
    textAlign: 'center',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  ////////////// dropdown1
  dropdown1ButtonStyle: {
    width: '80%',
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#444444',
  },
  dropdown1ButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  dropdown1ButtonArrowStyle: {
    fontSize: 28,
    color: '#FFFFFF',
  },
  dropdown1ButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
    color: '#FFFFFF',
  },
  dropdown1MenuStyle: {
    backgroundColor: '#444444',
    borderRadius: 8,
  },
  dropdown1SearchInputStyle: {
    backgroundColor: '#444444',
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
  },
  dropdown1ItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#B1BDC8',
  },
  dropdown1ItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  dropdown1ItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
    color: '#FFFFFF',
  }
});

export default SelectBeer