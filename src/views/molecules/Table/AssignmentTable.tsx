import styled from "styled-components";

const Table = styled.div`
    width: 100;
`;

const AssignmentTable = ({children}:{children: any}) => {
    return (
        <Table>
            AssigmentTable
            {children}
        </Table>
    )
}

export default AssignmentTable;
