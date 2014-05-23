function convertToHex(integer){
	var str = Number(integer).toString(16);
	return str.length == 1 ? "0" + str : str ; 
}

exports.RGBtoInt = function (red,green,blue){
	return(parseInt('0x' + convertToHex(red) + convertToHex(green) + convertToHex(blue), 16));
}