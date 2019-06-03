# BitProp

## Design Decisions

Since there are 2 types of entities namely User and Registrar,
Inorder to differentiate between them, there are certain mappings implemented.

Mapping approved_users are used so that the users created by the admin can be stored there.
Also, there is one more mapping called users which is an address-to-int mapping.
Whenever an Admin is created, the "users" mapping is called and Admins are assigned number "3" and Users are assigned number "2".
Hence, there can be a clear separation between Users and Admins.

In the application, since I was having difficulty retrieving the public key from remix and haven't implemented login systems as well, so to get the data necessary for the modifiers, there was a separate input given.
For example, in the createUser method in the smart contract, there's only one parameter required. Also there is a modifier which states that only admin can use this function.
Inorder to ensure that only admin can call this function, the admin id is also being provided in the front end.
Although this approach is not entirely foolproof, it does the trick.

The link for the videos where the flow of the entire project is shown is provided in the file "Video Link.txt".