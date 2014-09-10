/* Bij een closure kan de functie IN een andere 
functie de waarden van zijn parent functie ophalen,
maar de parent niet van zijn child */
function OuterFunction () {
	var A = "123";

	function InnerFunction () {
		var B = A;
	}
}