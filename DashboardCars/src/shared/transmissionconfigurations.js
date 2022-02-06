var formatFields = {
    showFileNameTemplate: false,
    showFilePageBreak: false,
    showMapperSelection: false,
    showMaxItemsPerFile: false,
    showIncludeHeaderRow: false,
    showIncludeFooterRow: false,
    showImageResolution: false,
    showIncludeBackUpDocumentsOnly: false,
    showIncludePreviousTransferInvs: false,
    showEdiFields: false,
};

var detailFields = {
    showFromEmailAddress: false,
    showMaxAttachmentsPerEmail: false,
    showNetworkFolderLocation: false,
    showExceptionFileFolderLocation: false,
    showToEmailAddressList: false,
    showOverwriteAtDestination: false,
    showDeleteFromSource: false,
    showFileTransferSection: false,
    showGroupByScac: false
};

// var formatKeys = {
//     fileNameTemplate: 'FileName',
//     filePageBreak: 'PageBreak',
//     //mapperSelection: '',
//     maxItemsPerFile: 'MaxInvoiceAttachment',
//     includeHeaderRow: 'IncludeHeaderRow',
//     includeFooterRow: 'IncludeFooterRow',
//     imageResolution: 'ImageResolution',
//     includeBackUpDocumentsOnly: 'BackupDocsOnly',
//     includePreviousTransferInvs: 'IncludePreviouslyTransferred',
// }

// var detailKeys = {
//     fromEmailAddress: 'FromEmailAddress',
//     maxAttachmentsPerEmail: 'MaxAttachmentEmail',
//     networkFolderLocationInbound: 'SourceDirectory',
//     networkFolderLocationOutbound: 'TargetDirectory',
//     toEmailAddressList: 'Email',
//     overwriteAtDestination: 'OverwriteDestination',
//     deleteFromSource: 'DeleteFromSource',
// }

function deactivateAllDetailFields() {
    detailFields.showFromEmailAddress = false;
    detailFields.showMaxAttachmentsPerEmail = false;
    detailFields.showToEmailAddressList = false;
    detailFields.showNetworkFolderLocation = false;
    detailFields.showExceptionFileFolderLocation = false;
    detailFields.showDeleteFromSource = false;
    detailFields.showOverwriteAtDestination = false;
    detailFields.showFileTransferSection = false;
    detailFields.showGroupByScac = false;
}

function deactivateAllFormatFields() {
    formatFields.showFileNameTemplate = false;
    formatFields.showFilePageBreak = false;
    formatFields.showMapperSelection = false;
    formatFields.showMaxItemsPerFile = false;
    formatFields.showIncludeHeaderRow = false;
    formatFields.showIncludeFooterRow = false;
    formatFields.showImageResolution = false;
    formatFields.showIncludeBackUpDocumentsOnly = false;
    formatFields.showIncludePreviousTransferInvs = false;
    formatFields.showEdiFields = false;
}


const TransmissionPanels = {
    getDetailsPanels(transactionTypeCode, direction, tranType, dataType) {
        deactivateAllDetailFields();
        if (tranType.indexOf("Email") >= 0) {
            detailFields.showFromEmailAddress = true;
            detailFields.showMaxAttachmentsPerEmail = true;
            detailFields.showToEmailAddressList = true;
        }
        if (tranType.indexOf("Network Share") >= 0) {
            detailFields.showNetworkFolderLocation = true;
            detailFields.showFileTransferSection = false;
            detailFields.showExceptionFileFolderLocation = false;
            if (direction.indexOf("In") >= 0) {
                detailFields.showDeleteFromSource = false;
                detailFields.showOverwriteAtDestination = false;
                detailFields.showExceptionFileFolderLocation = (transactionTypeCode.indexOf("FIN-ACC") >= 0) || (transactionTypeCode.indexOf("FIN-INV") >= 0);
            }
            if (direction.indexOf("Out") >= 0) {
                detailFields.showDeleteFromSource = false;
                detailFields.showOverwriteAtDestination = true;
            }
        }

        if (tranType.indexOf("File Transfer Protocol") >= 0) {
            detailFields.showFileTransferSection = true;
            if (direction.indexOf("In") >= 0) {
                detailFields.showDeleteFromSource = false;
                detailFields.showOverwriteAtDestination = false;
            }
            if (direction.indexOf("Out") >= 0) {
                detailFields.showDeleteFromSource = false;
                detailFields.showOverwriteAtDestination = true;
            }
        }
        if (((dataType.indexOf("EDI") >= 0)) && ((transactionTypeCode !== "FIN-ACC") && (transactionTypeCode !== "FIN-INV"))) {
            detailFields.showGroupByScac = true;
        }

        return detailFields;
    },
    getFormatPanels(tranType, direction, dataType) {
        deactivateAllFormatFields();

        if (dataType.indexOf("Delimited") >= 0) {
            formatFields.showFileNameTemplate = true;
            formatFields.showMapperSelection = true;
        }

        if (dataType == ("Text")) {
            formatFields.showFileNameTemplate = true;
            formatFields.showMapperSelection = true;
        }

        //until inbound filename template is inplemented,
        //this will be hiding the filename template
        if (direction.indexOf("In") >= 0) {
            formatFields.showFileNameTemplate = false;
        }

        if (tranType == "INV") {
            if (dataType.indexOf("Delimited") >= 0) {
                formatFields.showIncludeHeaderRow = true;
                formatFields.showIncludeFooterRow = true;
            }

            if (dataType.indexOf("DTN") >= 0) {
                formatFields.showFileNameTemplate = true;
                formatFields.showFilePageBreak = true;
                formatFields.showMaxItemsPerFile = true;
            }

            if (dataType.indexOf("Image") >= 0) {
                formatFields.showMaxItemsPerFile = true;

                if (direction.indexOf("Out") >= 0) {
                    formatFields.showFileNameTemplate = true;
                    formatFields.showImageResolution = true;
                    formatFields.showIncludeBackUpDocumentsOnly = true;
                    formatFields.showIncludePreviousTransferInvs = true;
                }
            }
        }

        if (dataType.indexOf("EDI") >= 0) {
            formatFields.showFileNameTemplate = true;
            formatFields.showMapperSelection = true;
            formatFields.showEdiFields = true;
            formatFields.showMaxItemsPerFile = true;
        }

        return formatFields;
    },
    deactivateAllDetailFields() {
        deactivateAllDetailFields();

        return detailFields;
    },
    deactivateAllFormatFields() {
        deactivateAllFormatFields();

        return formatFields;
    },
    close: close

};
export default TransmissionPanels;