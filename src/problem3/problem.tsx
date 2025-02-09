interface WalletBalance {
    currency: string;
    amount: number;
}
interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
}

interface Props extends BoxProps {} // this Props extend BoxProps with empty interface is redundant

const WalletPage: React.FC<Props> = (props: Props) => {
    //should use 1 prop definition
    const {children, ...rest} = props;
    const balances = useWalletBalances();
    const prices = usePrices();

    const getPriority = (blockchain: any): number => {
        //avoid using any
        switch (blockchain) {
            case "Osmosis":
                return 100;
            case "Ethereum":
                return 50;
            case "Arbitrum":
                return 30;
            case "Zilliqa":
                return 20;
            case "Neo":
                return 20;
            default:
                return -99;
        }
    }; //getPriority should be extracted to other files or use useCallback to prevent redundant function creation

    const sortedBalances = useMemo(() => {
        return balances
            .filter((balance: WalletBalance) => {
                const balancePriority = getPriority(balance.blockchain); //this constant is not used anywhereß
                if (lhsPriority > -99) {
                    //lhsPriority is not defined
                    if (balance.amount <= 0) {
                        return true;
                    }
                }
                return false;
            })
            .sort((lhs: WalletBalance, rhs: WalletBalance) => {
                const leftPriority = getPriority(lhs.blockchain);
                const rightPriority = getPriority(rhs.blockchain);
                if (leftPriority > rightPriority) {
                    return -1;
                } else if (rightPriority > leftPriority) {
                    return 1;
                }
            });
    }, [balances, prices]);

    const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
        return {
            ...balance,
            formatted: balance.amount.toFixed(),
        };
    });

    const rows = sortedBalances.map(
        //use formattedBalances instead of sortedBalances
        (balance: FormattedWalletBalance, index: number) => {
            const usdValue = prices[balance.currency] * balance.amount;
            return (
                <WalletRow
                    className={classes.row}
                    key={index} //avoid using index as react key
                    amount={balance.amount}
                    usdValue={usdValue}
                    formattedAmount={balance.formatted}
                />
            );
        }
    );

    return (
        <div {...rest}>
            {/* // can't pass all props to HTML element which is uncleared because
            there props that not div attribute */}
            {rows}
        </div>
    );
};
