import React, { Component } from "react";
import { ScrollView, View, StyleSheet, Text, Image, Dimensions } from "react-native";

import colors from "../config/colors.js";
import fonts from "../config/fonts.js";


export default class AlbumScreen extends Component {
    constructor(props) {
        super(props);
        this.title = this.props.route.params.albumData.strAlbum;
        this.image = this.props.route.params.albumData.strAlbumThumb;
        this.artist = this.props.route.params.albumData.strArtist;
        this.year = this.props.route.params.albumData.intYearReleased;
        this.genre = this.props.route.params.albumData.strGenre;
        this.description = this.props.route.params.albumData.strDescriptionEN;

        if (this.year == 0) this.year = null;
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.albumImageContainer}>
                    <Image
                        source={(!!this.image) ? {uri: this.image} : require("../assets/defaultAlbumImage.png")}
                        style={styles.albumImage}
                    />
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {this.title}
                    </Text>
                    <Text style={styles.artist}>
                        {this.artist}
                    </Text>
                </View>
                <View style={styles.table}>
                    {(!!this.year) && 
                        <View style={styles.tableRow}>
                            <View style={styles.tableCellLeft}>
                                <Text style={styles.attributeName}>
                                    YEAR
                                </Text>
                            </View>
                            <View style={styles.tableCellRight}>
                                <Text style={styles.rowContent}>
                                    {this.year}
                                </Text>
                            </View>
                        </View>
                    }
                    {(!!this.genre) && 
                        <View style={styles.tableRow}>
                            <View style={styles.tableCellLeft}>
                                <Text style={styles.attributeName}>
                                    GENRE
                                </Text>
                            </View>
                            <View style={styles.tableCellRight}>
                                <Text 
                                    style={styles.rowContent}
                                    numberOfLines={1}
                                >
                                    {this.genre}
                                </Text>
                            </View>
                        </View>
                    }
                </View>
                {(this.description) && 
                    <View style={styles.descriptionContainer}>
                        <View style={styles.descriptionTitleContainer}>
                            <Text style={styles.attributeName}>
                                DESCRIPTION
                            </Text>
                        </View>
                        <Text style={styles.description}>
                            {this.description}
                        </Text>
                    </View>
                }
            </ScrollView>
        );
    }
}

const screenWidth = Dimensions.get("screen").width
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.baseDark,
        paddingHorizontal: 20
    },
    albumImageContainer: {
        alignItems: "center",
        paddingTop: 70
    },
    albumImage: {
        width: "60%",
        height: screenWidth * 0.6
    },
    titleContainer: {
        alignItems: "center",
        paddingVertical: 25
    },
    title: {
        fontFamily: fonts.fontFamily,
        fontSize: fonts.primaryFontSize,
        color: fonts.primaryFontColor,
        fontWeight: fonts.bold,
        marginBottom: 10,
        textAlign: 'center'
    },
    artist: {
        fontFamily: fonts.fontFamily,
        fontSize: fonts.ternaryFontSize,
        color: fonts.secondaryFontColor,
        fontWeight: fonts.normal
    },
    table: {
        paddingVertical: 15
    },
    tableRow: {
        flexDirection: "row",
        paddingVertical: 10
    },
    tableCellLeft: {
        flex: 1,
        alignItems: "flex-end",
        paddingRight: 20
    },
    tableCellRight: {
        flex: 1,
        paddingLeft: 20
    },
    attributeName: {
        fontFamily: fonts.fontFamily,
        fontSize: fonts.secondaryFontSize,
        color: fonts.secondaryFontColor,
        fontWeight: fonts.normal
    },
    rowContent: {
        fontFamily: fonts.fontFamily,
        fontSize: fonts.secondaryFontSize,
        color: fonts.primaryFontColor,
        fontWeight: fonts.medium
    },
    descriptionContainer: {
        marginBottom: 50
    },
    descriptionTitleContainer: {
        alignItems: "center",
        paddingVertical: 20
    },
    description: {
        fontFamily: fonts.fontFamily,
        fontSize: fonts.ternaryFontSize,
        color: fonts.primaryFontColor,
        fontWeight: fonts.normal,
        lineHeight: 20
    }
})