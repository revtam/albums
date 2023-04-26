import React, { Component, createRef } from "react";
import { View, StyleSheet, TouchableNativeFeedback, Image, Text } from "react-native";
import { Tooltip } from "react-native-elements";

import colors from "../config/colors.js";
import fonts from "../config/fonts.js";
import favoritesListManager from "./FavoritesListManager.js";


export default class FavoriteToggler extends Component {
    constructor(props) {
        super(props);
        this.style = this.props.style;
        this.height = this.props.height;
        this.item = this.props.item;
        this.showTooltip = this.props.showTooltip;
        this.tooltipRef = createRef();
        this.state = {
            isFavorite: favoritesListManager.contains(this.item)
        }
    }
    render() {
        return (
            <View style={this.style}>
                <Tooltip 
                    ref={this.tooltipRef}
                    popover={
                        <Text style={styles.tooltipText}>
                            Added to Favorites
                        </Text>
                    }
                    withOverlay={false}
                    skipAndroidStatusBar={true}
                    backgroundColor={colors.darkerDark}
                    withPointer={false}
                >   
                    <TouchableNativeFeedback onPress={() => {
                        favoritesListManager.toggle(this.item);
                        this.setState({isFavorite: favoritesListManager.contains(this.item)});
                        if (!this.state.isFavorite && this.showTooltip) {
                            this.tooltipRef.current.toggleTooltip();
                            setTimeout(this.tooltipRef.current.toggleTooltip, 2500);
                        }
                    }}>
                        <View style={[styles.addToFavorites, {height: this.height, width: this.height}]}>
                            <Image 
                                source={this.state.isFavorite ? 
                                    require("../assets/heart-filled.png") :
                                    require("../assets/heart-outline.png")}
                                style={styles.favoritesImage}
                            />
                        </View>
                    </TouchableNativeFeedback> 
                </Tooltip>
            </View>
            
               
        )
    }
}

const styles = StyleSheet.create({
    addToFavorites: {
        justifyContent: "center",
        alignItems: "center"
    },
    favoritesImage: {
        width: "50%",
        resizeMode: "contain"
    },
    tooltipText: {
        fontFamily: fonts.fontFamily,
        fontSize: fonts.ternaryFontSize,
        color: fonts.secondaryFontColor,
        fontWeight: fonts.normal
    }
})