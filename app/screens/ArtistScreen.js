import React, { Component, createRef } from "react";
import { ScrollView, View, StyleSheet, Text, Image, Dimensions, ActivityIndicator, Alert } from "react-native";

import AlbumListElement from "../components/AlbumListElement.js";
import colors from "../config/colors.js";
import fonts from "../config/fonts.js";
import FavoriteToggler from "../components/FavoriteToggler.js";



export default class ArtistScreen extends Component {
    constructor(props) {
        super(props);
        this.artistName = this.props.route.params.artistName;
        this.tooltipRef = createRef();
        this.state = {
            isLoaded: false,
            artistValid: true,
            artistData: {},
            albumsData: [],
            favoritesObject: {}
        }
    }
    componentDidMount() {
        const baseUrl = "https://www.theaudiodb.com/api/v1/json/1";
        const artistEndpoint = "/search.php?s=" + this.artistName;
        const albumEndpoint = "/album.php?i=";

        const fetchAlbums = () => {
            fetch(baseUrl + albumEndpoint + this.state.artistData.idArtist)
                .then((body) => body.json())
                .then((res) => {
                    this.setState({albumsData: res.album});
                    this.setState({isLoaded: true});
                })
        }

            fetch(baseUrl + artistEndpoint)
                .then((body) => body.json())
                .then((res) => {
                    this.setState({artistData: res.artists[0]});
                    fetchAlbums();
                }).then(() => {
                    const favoritesObject = {
                        image: this.state.artistData.strArtistThumb,
                        name: this.state.artistData.strArtist,
                        key: this.state.artistData.idArtist
                    };
                    this.setState({favoritesObject: favoritesObject});
                }).catch(() => {    
                    this.props.navigation.goBack();
                    Alert.alert("Error", "Artist not found.\nSearched artist's name may be mistyped. Try again!");
                })
    }
    render() {
        if (!this.state.isLoaded) 
            return (
                <View style={styles.loadingScreen}>
                    <ActivityIndicator 
                        size="large" 
                        color={colors.primaryBlue}
                    />
                </View>
            ); 
        else {
            return (
                <ScrollView style={styles.container}>
                    <View style={styles.artistHero}>
                        <View style={styles.artistImageContainer}>
                            <Image 
                                source={(!!this.state.artistData.strArtistThumb) ? {uri: this.state.artistData.strArtistThumb} : require("../assets/defaultArtistImage.png")}
                                style={styles.artistImage}
                            />
                            <View style={styles.artistImageOverlay}/>
                        </View>
                        <FavoriteToggler  
                            style={styles.favoriteToggler}
                            height={70}
                            showTooltip={true}
                            item={this.state.favoritesObject}
                        />
                        <Text style={styles.artistName}>
                            {this.state.artistData.strArtist}
                        </Text>
                    </View>
                    <View style={styles.sectionTitleContainer}>
                        <Text style={styles.sectionTitle}>
                            ALBUMS
                        </Text>
                    </View>
                    <View>
                        {this.state.albumsData.map((albumData, i) => {
                            return (
                                <AlbumListElement 
                                    navigation={this.props.navigation} 
                                    albumData={albumData} 
                                    key={i}
                                />
                            )
                        })}
                    </View>
                </ScrollView>
            );
        }
    }
}

const screenWidth = Dimensions.get("screen").width
const styles = StyleSheet.create({
    sectionTitleContainer: {
        paddingTop: 30,
        paddingBottom: 20,
        alignItems: "center"
    },
    sectionTitle: {
        fontFamily: fonts.fontFamily,
        fontSize: fonts.secondaryFontSize,
        fontWeight: fonts.medium,
        color: fonts.secondaryFontColor
    },
    artistName: {
        position: "absolute",
        bottom: 0,
        right: 0,
        marginHorizontal: 40,
        marginBottom: 40,
        textAlign: "right",
        fontFamily: fonts.fontFamily,
        fontSize: fonts.bigFontSize,
        fontWeight: fonts.bold,
        color: fonts.primaryFontColor
    },
    artistImageContainer: {
        width: "100%", 
        height: "100%", 
    },
    artistImageOverlay: {
        position: "absolute", 
        width: "100%", 
        height: "100%", 
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    loadingScreen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.baseDark
    },
    container: {
        flex: 1,
        backgroundColor: colors.baseDark
    },
    artistHero: {
        width: "100%", 
        height: screenWidth,
        backgroundColor: colors.darkerDark
    },
    artistImage: {
        width: "100%", 
        height: "100%", 
        resizeMode: "cover"
    }, 
    favoriteToggler: {
        position: "absolute",
        top: 10,
        right: 10
    },
    imageLoadingOverlay: {
        flex: 1,
        position: "absolute"
    }
})