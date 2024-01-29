export default function Result({result}) {
    return(
        <table id="result">
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Investment Value</th>
                    <th>Interest (Year)</th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>
                </tr>
            </thead>
            <tbody>
                {result.map(data => (
                    <tr>
                        <td>{data.year}</td>
                        <td>{data.valueEndOfYear}</td>
                        <td>{data.interest}</td>
                        <td>{data.valueEndOfYear - (data.interest+data.annualInvestment)}</td>
                        <td>{data.valueEndOfYear - data.interest}</td>
                    </tr>
                ))}
            </tbody>

        </table>
    )
}