const ERC20ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",
    "function name() view returns (string)",
    "function transfer(address to, uint amount) returns (bool)",
    "function transferFrom(address sender, address recipient, uint256 amount) public returns (bool)",
    "function allowance(address user, address spender) view returns (uint256)",
    "event Transfer(address indexed from, address indexed to, uint amount)"
];

export default ERC20ABI