/* eslint-disable prettier/prettier */

//**********************import react*************************//

//**********************import mui*************************//
import { Box } from '@mui/material';

//**********************import project*************************//

import Action from './Actions/ActionPrf';






const TableActions = ({ params ,deleteProfFromTable }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Action Action="View More Information" params={params} />
            <Action Action="Edit Information" params={params} />
            <Action Action="Delete" params={params} deleteProfFromTable={deleteProfFromTable} />
        </Box>
    );
}

export default TableActions;


