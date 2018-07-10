/**
 * User: abhijit.baldawa
 */

import React from 'react';
import Button from '../buttons/index';
import {ObjParse} from '../../../common/utils';

function Pagination(props) {
    const
        { classes, isLoading, navigation, links: {next, prev, first, last}, onPagination } = props,
        start = ObjParse(navigation).getKey('start').getVal(),
        end = ObjParse(navigation).getKey('end').getVal(),
        total = ObjParse(navigation).getKey('total').getVal();

    return (
        <table style={{"padding":"0px 350px 0px 300px"}}>
            <tr>
                <td>
                    <Button
                        text={"<<First"}
                        color={"primary"}
                        disabled={isLoading || !first}
                        onPagination={ URL => onPagination(URL) }
                        url={first}
                    />
                </td>
                <td>
                    <Button
                        text={"<Previous"}
                        color={"primary"}
                        disabled={isLoading || !prev}
                        onPagination={ URL => onPagination(URL) }
                        url={prev}
                    />
                </td>
                <td>
                    {`${start} - ${end} of ${total}`}
                </td>
                <td>
                    <Button
                        text={"Next>"}
                        color={"primary"}
                        disabled={isLoading || !next}
                        onPagination={ URL => onPagination(URL) }
                        url={next}
                    />
                </td>
                <td>
                    <Button
                        text={"Last>>"}
                        color={"primary"}
                        disabled={isLoading || !last}
                        onPagination={ URL => onPagination(URL) }
                        url={last}
                    />
                </td>
            </tr>
        </table>
    );
}

export default Pagination;