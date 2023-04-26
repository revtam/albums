import React, {useState, useCallback, useEffect} from "react";
import { View, ScrollView, StyleSheet, StatusBar, TouchableNativeFeedback, Text, TextInput, Image, Alert } from "react-native";
import { HeaderBackButton } from '@react-navigation/stack';

import colors from "../config/colors";
import fonts from "../config/fonts";
import FavoritesButton from "../components/FavoritesButton.js";
import ArtistListElement from "../components/ArtistListElement.js";


function WelcomeScreen({navigation}) {

    const [ searchText, setSearchText ] = useState("");
    const [ showFavorites, setShowFavorites ] = useState(false);
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const toggleShowFavorites = () => {
        if (showFavorites) setShowFavorites(false);
        else setShowFavorites(true);
    }
    const handleSearchInput= () => {
        if (searchText.length == 0) Alert.alert("Input error", "Search input cannot be empty!\nType something first!");
        else navigation.navigate("Artist", {artistName: searchText.toLowerCase()});
    }

    useEffect(() => navigation.addListener('focus', payload => forceUpdate()), []);

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={colors.baseDark}
                barStyle={"light-content"}
            />
            <FavoritesButton 
                style={styles.favoritesButton} 
                active={showFavorites} 
                onPress={toggleShowFavorites}
            />
        {showFavorites &&
            <View style={styles.secondaryView}>
                <View style={styles.backButtonContainer}>
                    <HeaderBackButton 
                        style={styles.backButton}
                        tintColor={colors.primaryWhite} 
                        onPress={toggleShowFavorites}
                    />
                </View>         
            {favoritesList.length > 0 ? 
                <ScrollView> 
                    {favoritesList.map((artistData, i) => {
                        return (
                            <ArtistListElement 
                                navigation={navigation} 
                                artistData={artistData} 
                                key={i}
                            />
                        )
                    })}
                </ScrollView> 
                :
                <View style={styles.noFavoritesContainer}>
                    <Text style={styles.noFavoritesText}>
                        No artists found.
                    </Text>
                </View>
            }
            </View>
        }
        {!showFavorites &&
            <View style={styles.mainView}>
                <TouchableNativeFeedback onPress={() => Alert.alert("Student info", "Tamás Révész\na11838105")}>
                    <View style={styles.infoButton}>
                        <Text style={styles.infoText}>Student Info</Text>
                    </View>
                </TouchableNativeFeedback>
                <View style={styles.mainContentWrapper}>
                    <View style={styles.inputContainer}>
                        <Image 
                            source={require('../assets/search.png')}
                            style={styles.searchIcon}
                        />
                        <TextInput 
                            style={styles.inputText}
                            onChangeText={searchText => setSearchText(searchText)}
                            placeholder="Search for an artist..."
                            value={searchText}
                            onSubmitEditing={handleSearchInput}
                            selectTextOnFocus={true}
                            returnKeyType={"search"}
                            numberOfLines={1}
                        />
                    </View>
                    <TouchableNativeFeedback onPress={handleSearchInput}>
                        <View style={styles.searchButton}>
                            <Text style={styles.searchText}>Search</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        }
        </View>
    );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.baseDark
    },
    mainView: {
        width: "100%",
        height: "100%",
        position: "absolute",
        alignItems: "center"
    },
    secondaryView: {
        width: "100%",
        height: "100%",
        position: "absolute",
        paddingTop: 150
    },
    backButtonContainer: {
        position: "absolute", 
        top: 20, 
        left: 5
    },
    backButton: {
        height: 50,
        width: 50
    },
    favoritesButton: {
        position: "absolute",
        top: 20,
        right: 20
    },
    noFavoritesContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    noFavoritesText: {
        fontFamily: fonts.fontFamily,
        color: fonts.secondaryFontColor,
        fontWeight: fonts.medium,
        fontSize: fonts.secondaryFontSize
    },
    infoButton: {
        position: "absolute",
        top: 20,
        left: 20,
        backgroundColor: colors.darkerDark,
        paddingHorizontal: 20,
        height: 40,
        justifyContent: "center",
        borderRadius: 10
    },
    infoText: {
        fontSize: fonts.ternaryFontSize,
        fontWeight: fonts.normal,
        color: colors.secondaryGray
    },
    mainContentWrapper: {
        width: "75%",
        height: 340,
        top: 250,
        justifyContent: "space-between",
        alignItems: "center"
    },
    inputContainer: {
        width: "100%",
        height: 40,
        borderRadius: 100,
        backgroundColor: colors.primaryWhite,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12
    },
    inputText: {
        fontSize: fonts.inputFontSize,
        fontWeight: fonts.normal,
        color: colors.baseDark,
        flex: 1
    },
    searchIcon: {
        width: 20,
        resizeMode: "contain",
        marginRight: 12,
        tintColor: "#B1A8A8"
    },
    searchButton: {
        width: 250,
        height: 70,
        borderRadius: 35,
        backgroundColor: colors.primaryBlue,
        justifyContent: "center",
        alignItems: "center",
    },
    searchText: {
        fontFamily: fonts.fontFamily,
        color: fonts.primaryFontColor,
        fontWeight: fonts.bold,
        fontSize: fonts.primaryFontSize
    }   
})